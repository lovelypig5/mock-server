var deps = ['./dao'];
var ret = [];
deps.forEach((dep) => {
    Array.prototype.push.apply(ret, require(dep));
});
