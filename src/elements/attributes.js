export default function(namespace) {
  const ObjectElement = namespace.getElementClass('object');

  class Attributes extends ObjectElement {
    constructor() {
      super(...arguments);
      this.element = 'attributes';
    }
  }

  namespace.register('attributes', Attributes);
}
