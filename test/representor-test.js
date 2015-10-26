import {expect} from 'chai';

import minim from 'minim';
import representor from '../src/representor';

const namespace = minim.namespace().use(representor);

describe('Representor namespace', () => {
  context('resource element', () => {
    let resource;

    beforeEach(() => {
      resource = namespace.fromCompactRefract([
        'resource', {}, {href: '/foo', rels: ['foo']}, [
          ['attributes', {}, {}, [
            ['member', {}, {}, {
              key: ['string', {}, {}, 'foo'],
              value: ['string', {}, {}, 'bar'],
            }],
          ]],
          ['link', {}, {href: '/bar/1', rels: ['bar']}, []],
          ['link', {}, {href: '/bar/2', rels: ['bar']}, []],
          ['form', {}, {href: '/bar/2', rels: ['update']}, [
            ['member', {}, {}, {
              key: ['string', {}, {}, 'foo'],
              value: ['string', {}, {}, 'bar'],
            }],
          ]],
          ['resource', {}, {href: '/bar/3', rels: ['embed']}, []],
        ],
      ]);
    });

    it('should have element name resource', () => {
      expect(resource.element).to.equal('resource');
    });

    it('should parse the rels', () => {
      expect(resource.rels.contains('foo')).to.be.true;
    });

    it('should parse the href', () => {
      expect(resource.href.toValue()).to.equal('/foo');
    });

    context('#getByRel', () => {
      it('should return the correct links', () => {
        expect(resource.getByRel('bar').length).to.equal(2);
      });
    });

    context('#addLink', () => {
      it('should add the link', () => {
        expect(resource.getByRel('addLink').length).to.equal(0);
        const link = resource.addLink({
          rels: ['addLink'],
          href: '/foo/1',
        });
        expect(resource.getByRel('addLink').length).to.equal(1);
        expect(link.rels.toValue()).to.deep.equal(['addLink']);
      });
    });

    context('#addForm', () => {
      it('should add the link', () => {
        expect(resource.getByRel('addForm').length).to.equal(0);
        const form = resource.addForm({
          rels: ['addForm'],
          href: '/foo/1',
          method: 'POST',
        });
        expect(resource.getByRel('addForm').length).to.equal(1);
        expect(form.rels.toValue()).to.deep.equal(['addForm']);
      });
    });

    context('#links', () => {
      it('should return the correct number of links', () => {
        expect(resource.links.length).to.equal(2);
      });
    });

    context('#forms', () => {
      it('should return the correct number of forms', () => {
        expect(resource.forms.length).to.equal(1);
      });
    });

    context('#embedded', () => {
      it('should return the correct number of embedded', () => {
        expect(resource.embedded.length).to.equal(1);
      });
    });
  });

  context('attributes element', () => {
    let attributes;

    beforeEach(() => {
      attributes = namespace.fromCompactRefract([
        'attributes', {}, {}, [
          ['member', {}, {}, {
            key: ['string', {}, {}, 'foo'],
            value: ['string', {}, {}, 'bar'],
          }],
        ],
      ]);
    });

    it('should have element name attributes', () => {
      expect(attributes.element).to.equal('attributes');
    });

    it('should parse the members', () => {
      expect(attributes.get('foo').toValue()).to.equal('bar');
    });
  });

  context('link element', () => {
    let link;

    beforeEach(() => {
      link = namespace.fromCompactRefract([
        'link', {}, {href: '/foo', rels: ['foo']}, [],
      ]);
    });

    it('should have element name link', () => {
      expect(link.element).to.equal('link');
    });
  });

  context('form element', () => {
    let form;

    beforeEach(() => {
      form = namespace.fromCompactRefract([
        'form', {}, {}, [
          ['member', {}, {}, {
            key: ['string', {}, {}, 'foo'],
            value: ['string', {}, {}, 'bar'],
          }],
        ],
      ]);
    });

    it('should have element name form', () => {
      expect(form.element).to.equal('form');
    });

    it('should parse the members', () => {
      expect(form.get('foo').toValue()).to.equal('bar');
    });
  });
});
