describe("the super special button", () => {

    it("adds text", (done) => {
      const button = document.querySelector('#todoSubmit');
      button.click();
  

      setTimeout(() => {
        const text = document.querySelector('#todoTitle');
  
        expect(text).to.not.beNull();
  
        assert(text != null);
  
        done();
      })
    })
  });

