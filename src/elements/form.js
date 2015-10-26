export default function(namespace) {
  const ObjectElement = namespace.getElementClass('object');

  class Form extends ObjectElement {
    constructor(content, meta, attributes = {}) {
      attributes.href = attributes.href || '';
      attributes.rels = attributes.rels || [];
      attributes.method = attributes.method || 'GET';
      super(content, meta, attributes);
      this.element = 'form';
    }

    get rels() {
      return this.attributes.get('rels');
    }

    set rels(rels) {
      this.attributes.set('rels', rels);
      return this;
    }

    get href() {
      return this.attributes.get('href');
    }

    set href(href) {
      this.attributes.set('href', href);
      return this;
    }

    get method() {
      return this.attributes.get('method');
    }

    set method(method) {
      this.attributes.set('method', method);
      return this;
    }
  }

  namespace.register('form', Form);
}
