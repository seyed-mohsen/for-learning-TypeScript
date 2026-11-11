function proc(d: any[], t: string, f: boolean) {
  let r = [];
  for (let i = 0; i < d.length; i++) {
    if (f == true) {
      if (d[i].status == t) {
        r.push(d[i].title.toUpperCase() + " - " + d[i].id);
      }
    } else {
      r.push(d[i].title.toUpperCase() + " - " + d[i].id);
    }
  }
  return r;
}