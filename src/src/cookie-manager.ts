export default class CookieManager {
    constructor(private expires: any) {}

    setCookie(name: string, value: string, options: any): void {
        options = options || {};

        var expires = options.expires || this.expires;

        if (typeof expires == 'number' && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + '=' + value;

        for (var propName in options) {
            if (!options.hasOwnProperty(propName)) {
                continue;
            }

            updatedCookie += '; ' + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    deleteCookie(name: string): void {
        this.setCookie(name, '', {
            expires: -1
        });
    }

    getCookie(name: string): string {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    hasCookie(name: string): boolean {
        return this.getCookie(name) !== undefined;
    }
}
