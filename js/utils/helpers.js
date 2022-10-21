export function merge(lhs, rhs) {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if(rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p], rhs[p]);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }
  
    return lhs;
}
  
export function set(object, path, value) {
    if (typeof object !== 'object' || object === null) {
      return object;
    }
  
    if (typeof path !== 'string') {
      throw new Error('path must be string');
    }
  
    const result = path.split('.').reduceRight((acc, key) => ({
      [key]: acc,
    }), value);

    return merge(object, result);
}