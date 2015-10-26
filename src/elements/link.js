export default function(namespace) {
  const ResourceElement = namespace.getElementClass('resource');

  class Link extends ResourceElement {
    constructor() {
      super(...arguments);
      this.element = 'link';
    }
  }

  namespace.register('link', Link);
}
