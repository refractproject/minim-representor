export default function(namespace) {
  const ArrayElement = namespace.getElementClass('array');

  class Resource extends ArrayElement {
    constructor() {
      super(...arguments);
      this.element = 'resource';
    }

    get rels() {
      const rels = this.attributes.get('rels');

      if (rels) {
        return rels;
      }

      this.attributes.set('rels', []);
      return this.attributes.get('rels');
    }

    set rels(rels = []) {
      this.attributes.set('rels', rels);
      return this;
    }

    get href() {
      const href = this.attributes.get('href');

      if (href) {
        return href;
      }

      this.attributes.set('href', '');
      return this.attributes.get('href');
    }

    set href(href) {
      this.attributes.set('href', href);
      return this;
    }

    getByRel(rel = '') {
      return this
        .filter((element) => {
          return element.element === 'link' || element.element === 'form' || element.element === 'resource';
        })
        .filter((element) => element.rels.contains(rel));
    }

    get links() {
      return this.filter((element) => element.element === 'link');
    }

    get forms() {
      return this.filter((element) => element.element === 'form');
    }

    get embedded() {
      return this.filter((element) => element.element === 'resource');
    }

    addLink(linkAttributes) {
      const Link = namespace.getElementClass('link');
      const link = new Link();
      this.content.push(link);
      link.attributes.set(linkAttributes);
      return link;
    }

    addForm(formAttributes) {
      const Form = namespace.getElementClass('form');
      const form = new Form();
      this.content.push(form);
      form.attributes.set(formAttributes);
      return form;
    }
  }

  namespace.register('resource', Resource);
}
