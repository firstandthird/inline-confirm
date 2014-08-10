/*global describe,it,expect,before,after,beforeEach*/
describe('inline-confirm', function() {

  describe('plugin', function() {

    it('should expose inlineConfirm as a jquery plugin', function(done) {
      expect(typeof $.fn.inlineConfirm).to.equal('function');
      done();
    });

    it('should throw error if not adding on a button', function(done) {
      expect(function() {
        $('#div').inlineConfirm();
      }).to.throw('Must be a button element');
      done();
    });

    it('should throw error if not type="submit"', function(done) {
      expect(function() {
        $('#buttonNoSubmit').inlineConfirm();
      }).to.throw('Must have type="submit"');
      done();
    });

    it('should return jquery elements for chaining', function(done) {
      var el = $('#buttonSubmit').inlineConfirm();
      expect(el.length).to.equal(1);
      done();
    });

  });

  describe('click', function() {

    var btn;
    var form;
    var delay = 20;
    beforeEach(function(done) {
      form = $('#form1');
      btn = form.find('button');
      btn.off('click');
      btn.text('Delete');
      btn.inlineConfirm({
        confirmClass: 'btn-confirm',
        delay: delay
      });
      done();
    });

    it('should prevent submission on first click', function(done) {
      var called = false;
      form.on('submit', function(e) {
        called = true;
        e.preventDefault();
      });
      btn.click();
      expect(called).to.equal(false);
      form.off('submit');
      done();
    });

    it('should swap text out with Are you sure?', function(done) {
      expect(btn.text()).to.equal('Delete');
      btn.click();
      expect(btn.text()).to.equal('Are you sure?');
      done();
    });

    it('should pass through to form submit on second click', function(done) {
      var calledCount = 0;
      form.on('submit', function(e) {
        calledCount++;
        e.preventDefault();
      });
      btn.click();
      btn.click();
      expect(calledCount).to.equal(1);
      form.off('submit');
      done();
    });

    it('should add a class after clicking', function(done) {
      btn.click();
      expect(btn.hasClass('btn-confirm')).to.equal(true);
      done();
    });

    it('should change text back to original after X seconds', function(done) {
      expect(btn.text()).to.equal('Delete');
      btn.click();
      expect(btn.text()).to.equal('Are you sure?');
      expect(btn.hasClass('btn-confirm')).to.equal(true);
      setTimeout(function() {
        expect(btn.text()).to.equal('Delete');
        expect(btn.hasClass('btn-confirm')).to.equal(false);
        done();
      }, delay+10);
    });

    it('should allow submitting after X seconds', function(done) {
      var called = false;
      form.on('submit', function(e) {
        called = true;
        e.preventDefault();
      });
      expect(btn.text()).to.equal('Delete');
      btn.click();
      expect(btn.text()).to.equal('Are you sure?');
      expect(btn.hasClass('btn-confirm')).to.equal(true);
      setTimeout(function() {
        expect(btn.text()).to.equal('Delete');
        expect(btn.hasClass('btn-confirm')).to.equal(false);
        btn.click();
        expect(btn.text()).to.equal('Are you sure?');
        expect(btn.hasClass('btn-confirm')).to.equal(true);
        expect(called).to.equal(false);
        done();
      }, delay+10);
    });
  });
});
