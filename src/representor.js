/*
 * Representor elements
 *
 * + Resource
 *   + Attributes
 *   + Link
 *   + Form
 *   + Resource
 */

export function namespace(options) {
  for (const name of ['resource', 'attributes', 'link', 'form']) {
    require(`./elements/${name}`)(options.base);
  }
}

export default {namespace};
