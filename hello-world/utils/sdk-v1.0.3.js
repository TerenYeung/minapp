! function t(e, n, r) {
  function o(u, a) {
    if (!n[u]) {
      if (!e[u]) {
        var s = "function" == typeof require && require;
        if (!a && s) return s(u, !0);
        if (i) return i(u, !0);
        var c = new Error("Cannot find module '" + u + "'");
        throw c.code = "MODULE_NOT_FOUND", c
      }
      var f = n[u] = {
        exports: {}
      };
      e[u][0].call(f.exports, function(t) {
        var n = e[u][1][t];
        return o(n ? n : t)
      }, f, f.exports, t, e, n, r)
    }
    return n[u].exports
  }
  for (var i = "function" == typeof require && require, u = 0; u < r.length; u++) o(r[u]);
  return o
}({
  1: [function(t, e, n) {
    "use strict";
    var r, o = Object.prototype,
      i = o.hasOwnProperty,
      u = o.toString;
    "function" == typeof Symbol && (r = Symbol.prototype.valueOf);
    var a = function(t) {
        return t !== t
      },
      s = {
        boolean: 1,
        number: 1,
        string: 1,
        undefined: 1
      },
      c = /^([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)$/,
      f = /^[A-Fa-f0-9]+$/,
      l = {};
    l.a = l.type = function(t, e) {
      return typeof t === e
    }, l.defined = function(t) {
      return "undefined" != typeof t
    }, l.empty = function(t) {
      var e, n = u.call(t);
      if ("[object Array]" === n || "[object Arguments]" === n || "[object String]" === n) return 0 === t.length;
      if ("[object Object]" === n) {
        for (e in t)
          if (i.call(t, e)) return !1;
        return !0
      }
      return !t
    }, l.equal = function(t, e) {
      if (t === e) return !0;
      var n, r = u.call(t);
      if (r !== u.call(e)) return !1;
      if ("[object Object]" === r) {
        for (n in t)
          if (!(l.equal(t[n], e[n]) && n in e)) return !1;
        for (n in e)
          if (!(l.equal(t[n], e[n]) && n in t)) return !1;
        return !0
      }
      if ("[object Array]" === r) {
        if (n = t.length, n !== e.length) return !1;
        for (; n--;)
          if (!l.equal(t[n], e[n])) return !1;
        return !0
      }
      return "[object Function]" === r ? t.prototype === e.prototype : "[object Date]" === r && t.getTime() === e.getTime()
    }, l.hosted = function(t, e) {
      var n = typeof e[t];
      return "object" === n ? !!e[t] : !s[n]
    }, l.instance = l.instanceof = function(t, e) {
      return t instanceof e
    }, l.nil = l.null = function(t) {
      return null === t
    }, l.undef = l.undefined = function(t) {
      return "undefined" == typeof t
    }, l.args = l.arguments = function(t) {
      var e = "[object Arguments]" === u.call(t),
        n = !l.array(t) && l.arraylike(t) && l.object(t) && l.fn(t.callee);
      return e || n
    }, l.array = Array.isArray || function(t) {
      return "[object Array]" === u.call(t)
    }, l.args.empty = function(t) {
      return l.args(t) && 0 === t.length
    }, l.array.empty = function(t) {
      return l.array(t) && 0 === t.length
    }, l.arraylike = function(t) {
      return !!t && !l.bool(t) && i.call(t, "length") && isFinite(t.length) && l.number(t.length) && t.length >= 0
    }, l.bool = l.boolean = function(t) {
      return "[object Boolean]" === u.call(t)
    }, l.false = function(t) {
      return l.bool(t) && Boolean(Number(t)) === !1
    }, l.true = function(t) {
      return l.bool(t) && Boolean(Number(t)) === !0
    }, l.date = function(t) {
      return "[object Date]" === u.call(t)
    }, l.date.valid = function(t) {
      return l.date(t) && !isNaN(Number(t))
    }, l.element = function(t) {
      return void 0 !== t && "undefined" != typeof HTMLElement && t instanceof HTMLElement && 1 === t.nodeType
    }, l.error = function(t) {
      return "[object Error]" === u.call(t)
    }, l.fn = l.function = function(t) {
      var e = "undefined" != typeof window && t === window.alert;
      return e || "[object Function]" === u.call(t)
    }, l.number = function(t) {
      return "[object Number]" === u.call(t)
    }, l.infinite = function(t) {
      return t === 1 / 0 || t === -(1 / 0)
    }, l.decimal = function(t) {
      return l.number(t) && !a(t) && !l.infinite(t) && t % 1 !== 0
    }, l.divisibleBy = function(t, e) {
      var n = l.infinite(t),
        r = l.infinite(e),
        o = l.number(t) && !a(t) && l.number(e) && !a(e) && 0 !== e;
      return n || r || o && t % e === 0
    }, l.integer = l.int = function(t) {
      return l.number(t) && !a(t) && t % 1 === 0
    }, l.maximum = function(t, e) {
      if (a(t)) throw new TypeError("NaN is not a valid value");
      if (!l.arraylike(e)) throw new TypeError("second argument must be array-like");
      for (var n = e.length; --n >= 0;)
        if (t < e[n]) return !1;
      return !0
    }, l.minimum = function(t, e) {
      if (a(t)) throw new TypeError("NaN is not a valid value");
      if (!l.arraylike(e)) throw new TypeError("second argument must be array-like");
      for (var n = e.length; --n >= 0;)
        if (t > e[n]) return !1;
      return !0
    }, l.nan = function(t) {
      return !l.number(t) || t !== t
    }, l.even = function(t) {
      return l.infinite(t) || l.number(t) && t === t && t % 2 === 0
    }, l.odd = function(t) {
      return l.infinite(t) || l.number(t) && t === t && t % 2 !== 0
    }, l.ge = function(t, e) {
      if (a(t) || a(e)) throw new TypeError("NaN is not a valid value");
      return !l.infinite(t) && !l.infinite(e) && t >= e
    }, l.gt = function(t, e) {
      if (a(t) || a(e)) throw new TypeError("NaN is not a valid value");
      return !l.infinite(t) && !l.infinite(e) && t > e
    }, l.le = function(t, e) {
      if (a(t) || a(e)) throw new TypeError("NaN is not a valid value");
      return !l.infinite(t) && !l.infinite(e) && t <= e
    }, l.lt = function(t, e) {
      if (a(t) || a(e)) throw new TypeError("NaN is not a valid value");
      return !l.infinite(t) && !l.infinite(e) && t < e
    }, l.within = function(t, e, n) {
      if (a(t) || a(e) || a(n)) throw new TypeError("NaN is not a valid value");
      if (!l.number(t) || !l.number(e) || !l.number(n)) throw new TypeError("all arguments must be numbers");
      var r = l.infinite(t) || l.infinite(e) || l.infinite(n);
      return r || t >= e && t <= n
    }, l.object = function(t) {
      return "[object Object]" === u.call(t)
    }, l.primitive = function(t) {
      return !t || !("object" == typeof t || l.object(t) || l.fn(t) || l.array(t))
    }, l.hash = function(t) {
      return l.object(t) && t.constructor === Object && !t.nodeType && !t.setInterval
    }, l.regexp = function(t) {
      return "[object RegExp]" === u.call(t)
    }, l.string = function(t) {
      return "[object String]" === u.call(t)
    }, l.base64 = function(t) {
      return l.string(t) && (!t.length || c.test(t))
    }, l.hex = function(t) {
      return l.string(t) && (!t.length || f.test(t))
    }, l.symbol = function(t) {
      return "function" == typeof Symbol && "[object Symbol]" === u.call(t) && "symbol" == typeof r.call(t)
    }, e.exports = l
  }, {}],
  2: [function(t, e, n) {
    "use strict";
    e.exports = t("./lib/extend")
  }, {
    "./lib/extend": 3
  }],
  3: [function(t, e, n) {
    "use strict";
    var r = t("is"),
      o = function t() {
        var e, n, o, i, u, a, s = arguments[0] || {},
          c = 1,
          f = arguments.length,
          l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[1] || {}, c = 2), "object" == typeof s || r.fn(s) || (s = {}); c < f; c++)
          if (e = arguments[c], null != e) {
            "string" == typeof e && (e = e.split(""));
            for (n in e) o = s[n], i = e[n], s !== i && (l && i && (r.hash(i) || (u = r.array(i))) ? (u ? (u = !1, a = o && r.array(o) ? o : []) : a = o && r.hash(o) ? o : {}, s[n] = t(l, a, i)) : "undefined" != typeof i && (s[n] = i))
          }
        return s
      };
    o.version = "1.1.3", e.exports = o
  }, {
    is: 1
  }],
  4: [function(t, e, n) {
    function r() {
      throw new Error("setTimeout has not been defined")
    }

    function o() {
      throw new Error("clearTimeout has not been defined")
    }

    function i(t) {
      if (l === setTimeout) return setTimeout(t, 0);
      if ((l === r || !l) && setTimeout) return l = setTimeout, setTimeout(t, 0);
      try {
        return l(t, 0)
      } catch (e) {
        try {
          return l.call(null, t, 0)
        } catch (e) {
          return l.call(this, t, 0)
        }
      }
    }

    function u(t) {
      if (h === clearTimeout) return clearTimeout(t);
      if ((h === o || !h) && clearTimeout) return h = clearTimeout, clearTimeout(t);
      try {
        return h(t)
      } catch (e) {
        try {
          return h.call(null, t)
        } catch (e) {
          return h.call(this, t)
        }
      }
    }

    function a() {
      _ && p && (_ = !1, p.length ? v = p.concat(v) : E = -1, v.length && s())
    }

    function s() {
      if (!_) {
        var t = i(a);
        _ = !0;
        for (var e = v.length; e;) {
          for (p = v, v = []; ++E < e;) p && p[E].run();
          E = -1, e = v.length
        }
        p = null, _ = !1, u(t)
      }
    }

    function c(t, e) {
      this.fun = t, this.array = e
    }

    function f() {}
    var l, h, d = e.exports = {};
    ! function() {
      try {
        l = "function" == typeof setTimeout ? setTimeout : r
      } catch (t) {
        l = r
      }
      try {
        h = "function" == typeof clearTimeout ? clearTimeout : o
      } catch (t) {
        h = o
      }
    }();
    var p, v = [],
      _ = !1,
      E = -1;
    d.nextTick = function(t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      v.push(new c(t, e)), 1 !== v.length || _ || i(s)
    }, c.prototype.run = function() {
      this.fun.apply(null, this.array)
    }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = f, d.addListener = f, d.once = f, d.off = f, d.removeListener = f, d.removeAllListeners = f, d.emit = f, d.binding = function(t) {
      throw new Error("process.binding is not supported")
    }, d.cwd = function() {
      return "/"
    }, d.chdir = function(t) {
      throw new Error("process.chdir is not supported")
    }, d.umask = function() {
      return 0
    }
  }, {}],
  5: [function(t, e, n) {
    (function(r, o) {
      ! function(t, r) {
        "object" == typeof n && "undefined" != typeof e ? r(n) : "function" == typeof define && define.amd ? define(["exports"], r) : r(t.RSVP = t.RSVP || {})
      }(this, function(e) {
        "use strict";

        function n(t, e) {
          for (var n = 0, r = t.length; n < r; n++)
            if (t[n] === e) return n;
          return -1
        }

        function i(t) {
          var e = t._promiseCallbacks;
          return e || (e = t._promiseCallbacks = {}), e
        }

        function u(t, e) {
          return "onerror" === t ? void At.on("error", e) : 2 !== arguments.length ? At[t] : void(At[t] = e)
        }

        function a(t) {
          return "function" == typeof t || "object" == typeof t && null !== t
        }

        function s(t) {
          return "function" == typeof t
        }

        function c(t) {
          return "object" == typeof t && null !== t
        }

        function f() {}

        function l() {
          setTimeout(function() {
            for (var t = 0; t < It.length; t++) {
              var e = It[t],
                n = e.payload;
              n.guid = n.key + n.id, n.childGuid = n.key + n.childId, n.error && (n.stack = n.error.stack), At.trigger(e.name, e.payload)
            }
            It.length = 0
          }, 50)
        }

        function h(t, e, n) {
          1 === It.push({
            name: t,
            payload: {
              key: e._guidKey,
              id: e._id,
              eventName: t,
              detail: e._result,
              childId: n && n._id,
              label: e._label,
              timeStamp: Rt(),
              error: At["instrument-with-stack"] ? new Error(e._label) : null
            }
          }) && l()
        }

        function d(t, e) {
          var n = this;
          if (t && "object" == typeof t && t.constructor === n) return t;
          var r = new n(v, e);
          return m(r, t), r
        }

        function p() {
          return new TypeError("A promises callback cannot return that same promise.")
        }

        function v() {}

        function _(t) {
          try {
            return t.then
          } catch (t) {
            return Lt.error = t, Lt
          }
        }

        function E(t, e, n, r) {
          try {
            t.call(e, n, r)
          } catch (t) {
            return t
          }
        }

        function y(t, e, n) {
          At.async(function(t) {
            var r = !1,
              o = E(n, e, function(n) {
                r || (r = !0, e !== n ? m(t, n, void 0) : b(t, n))
              }, function(e) {
                r || (r = !0, A(t, e))
              }, "Settle: " + (t._label || " unknown promise"));
            !r && o && (r = !0, A(t, o))
          }, t)
        }

        function T(t, e) {
          e._state === Nt ? b(t, e._result) : e._state === Ut ? (e._onError = null, A(t, e._result)) : S(e, void 0, function(n) {
            e !== n ? m(t, n, void 0) : b(t, n)
          }, function(e) {
            return A(t, e)
          })
        }

        function g(t, e, n) {
          e.constructor === t.constructor && n === N && t.constructor.resolve === d ? T(t, e) : n === Lt ? A(t, Lt.error) : void 0 === n ? b(t, e) : s(n) ? y(t, e, n) : b(t, e)
        }

        function m(t, e) {
          t === e ? b(t, e) : a(e) ? g(t, e, _(e)) : b(t, e)
        }

        function w(t) {
          t._onError && t._onError(t._result), O(t)
        }

        function b(t, e) {
          t._state === Ct && (t._result = e, t._state = Nt, 0 === t._subscribers.length ? At.instrument && h("fulfilled", t) : At.async(O, t))
        }

        function A(t, e) {
          t._state === Ct && (t._state = Ut, t._result = e, At.async(w, t))
        }

        function S(t, e, n, r) {
          var o = t._subscribers,
            i = o.length;
          t._onError = null, o[i] = e, o[i + Nt] = n, o[i + Ut] = r, 0 === i && t._state && At.async(O, t)
        }

        function O(t) {
          var e = t._subscribers,
            n = t._state;
          if (At.instrument && h(n === Nt ? "fulfilled" : "rejected", t), 0 !== e.length) {
            for (var r = void 0, o = void 0, i = t._result, u = 0; u < e.length; u += 3) r = e[u], o = e[u + n], r ? I(n, r, o, i) : o(i);
            t._subscribers.length = 0
          }
        }

        function R() {
          this.error = null
        }

        function D(t, e) {
          try {
            return t(e)
          } catch (t) {
            return jt.error = t, jt
          }
        }

        function I(t, e, n, r) {
          var o = s(n),
            i = void 0,
            u = void 0,
            a = void 0,
            c = void 0;
          if (o) {
            if (i = D(n, r), i === jt ? (c = !0, u = i.error, i = null) : a = !0, e === i) return void A(e, p())
          } else i = r, a = !0;
          e._state !== Ct || (o && a ? m(e, i) : c ? A(e, u) : t === Nt ? b(e, i) : t === Ut && A(e, i))
        }

        function C(t, e) {
          var n = !1;
          try {
            e(function(e) {
              n || (n = !0, m(t, e))
            }, function(e) {
              n || (n = !0, A(t, e))
            })
          } catch (e) {
            A(t, e)
          }
        }

        function N(t, e, n) {
          var r = arguments,
            o = this,
            i = o._state;
          if (i === Nt && !t || i === Ut && !e) return At.instrument && h("chained", o, o), o;
          o._onError = null;
          var u = new o.constructor(v, n),
            a = o._result;
          return At.instrument && h("chained", o, u), i ? ! function() {
            var t = r[i - 1];
            At.async(function() {
              return I(i, u, t, a)
            })
          }() : S(o, u, t, e), u
        }

        function U(t, e, n) {
          return t === Nt ? {
            state: "fulfilled",
            value: n
          } : {
            state: "rejected",
            reason: n
          }
        }

        function L(t, e, n, r) {
          this._instanceConstructor = t, this.promise = new t(v, r), this._abortOnReject = n, this._validateInput(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._init(), 0 === this.length ? b(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && b(this.promise, this._result))) : A(this.promise, this._validationError())
        }

        function j(t, e) {
          return new L(this, t, !0, e).promise
        }

        function P(t, e) {
          var n = this,
            r = new n(v, e);
          if (!Ot(t)) return A(r, new TypeError("You must pass an array to race.")), r;
          for (var o = 0; r._state === Ct && o < t.length; o++) S(n.resolve(t[o]), void 0, function(t) {
            return m(r, t)
          }, function(t) {
            return A(r, t)
          });
          return r
        }

        function x(t, e) {
          var n = this,
            r = new n(v, e);
          return A(r, t), r
        }

        function G() {
          throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
        }

        function k() {
          throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
        }

        function q(t, e) {
          this._id = xt++, this._label = e, this._state = void 0, this._result = void 0, this._subscribers = [], At.instrument && h("created", this), v !== t && ("function" != typeof t && G(), this instanceof q ? C(this, t) : k())
        }

        function H() {
          this.value = void 0
        }

        function M(t) {
          try {
            return t.then
          } catch (t) {
            return Gt.value = t, Gt
          }
        }

        function K(t, e, n) {
          try {
            t.apply(e, n)
          } catch (t) {
            return Gt.value = t, Gt
          }
        }

        function Y(t, e) {
          for (var n = {}, r = t.length, o = new Array(r), i = 0; i < r; i++) o[i] = t[i];
          for (var u = 0; u < e.length; u++) {
            var a = e[u];
            n[a] = o[u + 1]
          }
          return n
        }

        function F(t) {
          for (var e = t.length, n = new Array(e - 1), r = 1; r < e; r++) n[r - 1] = t[r];
          return n
        }

        function B(t, e) {
          return {
            then: function(n, r) {
              return t.call(e, n, r)
            }
          }
        }

        function V(t, e) {
          var n = function() {
            for (var n = this, r = arguments.length, o = new Array(r + 1), i = !1, u = 0; u < r; ++u) {
              var a = arguments[u];
              if (!i) {
                if (i = Z(a), i === kt) {
                  var s = new q(v);
                  return A(s, kt.value), s
                }
                i && i !== !0 && (a = B(i, a))
              }
              o[u] = a
            }
            var c = new q(v);
            return o[r] = function(t, n) {
              t ? A(c, t) : void 0 === e ? m(c, n) : e === !0 ? m(c, F(arguments)) : Ot(e) ? m(c, Y(arguments, e)) : m(c, n)
            }, i ? X(c, o, t, n) : z(c, o, t, n)
          };
          return n.__proto__ = t, n
        }

        function z(t, e, n, r) {
          var o = K(n, r, e);
          return o === Gt && A(t, o.value), t
        }

        function X(t, e, n, r) {
          return q.all(e).then(function(e) {
            var o = K(n, r, e);
            return o === Gt && A(t, o.value), t
          })
        }

        function Z(t) {
          return !(!t || "object" != typeof t) && (t.constructor === q || M(t))
        }

        function W(t, e) {
          return q.all(t, e)
        }

        function $(t, e, n) {
          this._superConstructor(t, e, !1, n)
        }

        function J(t, e) {
          return new $(q, t, e).promise
        }

        function Q(t, e) {
          return q.race(t, e)
        }

        function tt(t, e, n) {
          this._superConstructor(t, e, !0, n)
        }

        function et(t, e) {
          return new tt(q, t, e).promise
        }

        function nt(t, e, n) {
          this._superConstructor(t, e, !1, n)
        }

        function rt(t, e) {
          return new nt(q, t, e).promise
        }

        function ot(t) {
          throw setTimeout(function() {
            throw t
          }), t
        }

        function it(t) {
          var e = {
            resolve: void 0,
            reject: void 0
          };
          return e.promise = new q(function(t, n) {
            e.resolve = t, e.reject = n
          }, t), e
        }

        function ut(t, e, n) {
          return q.all(t, n).then(function(t) {
            if (!s(e)) throw new TypeError("You must pass a function as map's second argument.");
            for (var r = t.length, o = new Array(r), i = 0; i < r; i++) o[i] = e(t[i]);
            return q.all(o, n)
          })
        }

        function at(t, e) {
          return q.resolve(t, e)
        }

        function st(t, e) {
          return q.reject(t, e)
        }

        function ct(t, e) {
          return q.all(t, e)
        }

        function ft(t, e) {
          return q.resolve(t, e).then(function(t) {
            return ct(t, e)
          })
        }

        function lt(t, e, n) {
          var r = Ot(t) ? ct(t, n) : ft(t, n);
          return r.then(function(t) {
            if (!s(e)) throw new TypeError("You must pass a function as filter's second argument.");
            for (var r = t.length, o = new Array(r), i = 0; i < r; i++) o[i] = e(t[i]);
            return ct(o, n).then(function(e) {
              for (var n = new Array(r), o = 0, i = 0; i < r; i++) e[i] && (n[o] = t[i], o++);
              return n.length = o, n
            })
          })
        }

        function ht(t, e) {
          Vt[qt] = t, Vt[qt + 1] = e, qt += 2, 2 === qt && zt()
        }

        function dt() {
          var t = r.nextTick,
            e = r.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
          return Array.isArray(e) && "0" === e[1] && "10" === e[2] && (t = setImmediate),
            function() {
              return t(yt)
            }
        }

        function pt() {
          return "undefined" != typeof Ht ? function() {
            Ht(yt)
          } : Et()
        }

        function vt() {
          var t = 0,
            e = new Yt(yt),
            n = document.createTextNode("");
          return e.observe(n, {
              characterData: !0
            }),
            function() {
              return n.data = t = ++t % 2
            }
        }

        function _t() {
          var t = new MessageChannel;
          return t.port1.onmessage = yt,
            function() {
              return t.port2.postMessage(0)
            }
        }

        function Et() {
          return function() {
            return setTimeout(yt, 1)
          }
        }

        function yt() {
          for (var t = 0; t < qt; t += 2) {
            var e = Vt[t],
              n = Vt[t + 1];
            e(n), Vt[t] = void 0, Vt[t + 1] = void 0
          }
          qt = 0
        }

        function Tt() {
          try {
            var e = t,
              n = e("vertx");
            return Ht = n.runOnLoop || n.runOnContext, pt()
          } catch (t) {
            return Et()
          }
        }

        function gt(t, e, n) {
          return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[e] = n, t
        }

        function mt() {
          At.on.apply(At, arguments)
        }

        function wt() {
          At.off.apply(At, arguments)
        }
        var bt = {
            mixin: function(t) {
              return t.on = this.on, t.off = this.off, t.trigger = this.trigger, t._promiseCallbacks = void 0, t
            },
            on: function(t, e) {
              if ("function" != typeof e) throw new TypeError("Callback must be a function");
              var r = i(this),
                o = void 0;
              o = r[t], o || (o = r[t] = []), n(o, e) === -1 && o.push(e)
            },
            off: function(t, e) {
              var r = i(this),
                o = void 0,
                u = void 0;
              return e ? (o = r[t], u = n(o, e), void(u !== -1 && o.splice(u, 1))) : void(r[t] = [])
            },
            trigger: function(t, e, n) {
              var r = i(this),
                o = void 0,
                u = void 0;
              if (o = r[t])
                for (var a = 0; a < o.length; a++)(u = o[a])(e, n)
            }
          },
          At = {
            instrument: !1
          };
        bt.mixin(At);
        var St = void 0;
        St = Array.isArray ? Array.isArray : function(t) {
          return "[object Array]" === Object.prototype.toString.call(t)
        };
        var Ot = St,
          Rt = Date.now || function() {
            return (new Date).getTime()
          },
          Dt = Object.create || function(t) {
            if (arguments.length > 1) throw new Error("Second argument not supported");
            if ("object" != typeof t) throw new TypeError("Argument must be an object");
            return f.prototype = t, new f
          },
          It = [],
          Ct = void 0,
          Nt = 1,
          Ut = 2,
          Lt = new R,
          jt = new R;
        L.prototype._validateInput = function(t) {
          return Ot(t)
        }, L.prototype._validationError = function() {
          return new Error("Array Methods must be provided an Array")
        }, L.prototype._init = function() {
          this._result = new Array(this.length)
        }, L.prototype._enumerate = function() {
          for (var t = this.length, e = this.promise, n = this._input, r = 0; e._state === Ct && r < t; r++) this._eachEntry(n[r], r)
        }, L.prototype._settleMaybeThenable = function(t, e) {
          var n = this._instanceConstructor,
            r = n.resolve;
          if (r === d) {
            var o = _(t);
            if (o === N && t._state !== Ct) t._onError = null, this._settledAt(t._state, e, t._result);
            else if ("function" != typeof o) this._remaining--, this._result[e] = this._makeResult(Nt, e, t);
            else if (n === q) {
              var i = new n(v);
              g(i, t, o), this._willSettleAt(i, e)
            } else this._willSettleAt(new n(function(e) {
              return e(t)
            }), e)
          } else this._willSettleAt(r(t), e)
        }, L.prototype._eachEntry = function(t, e) {
          c(t) ? this._settleMaybeThenable(t, e) : (this._remaining--, this._result[e] = this._makeResult(Nt, e, t))
        }, L.prototype._settledAt = function(t, e, n) {
          var r = this.promise;
          r._state === Ct && (this._remaining--, this._abortOnReject && t === Ut ? A(r, n) : this._result[e] = this._makeResult(t, e, n)), 0 === this._remaining && b(r, this._result)
        }, L.prototype._makeResult = function(t, e, n) {
          return n
        }, L.prototype._willSettleAt = function(t, e) {
          var n = this;
          S(t, void 0, function(t) {
            return n._settledAt(Nt, e, t)
          }, function(t) {
            return n._settledAt(Ut, e, t)
          })
        };
        var Pt = "rsvp_" + Rt() + "-",
          xt = 0;
        q.cast = d, q.all = j, q.race = P, q.resolve = d, q.reject = x, q.prototype = {
          constructor: q,
          _guidKey: Pt,
          _onError: function(t) {
            var e = this;
            At.after(function() {
              e._onError && At.trigger("error", t, e._label)
            })
          },
          then: N,
          catch: function(t, e) {
            return this.then(void 0, t, e)
          },
          finally: function(t, e) {
            var n = this,
              r = n.constructor;
            return n.then(function(e) {
              return r.resolve(t()).then(function() {
                return e
              })
            }, function(e) {
              return r.resolve(t()).then(function() {
                throw e
              })
            }, e)
          }
        };
        var Gt = new H,
          kt = new H;
        $.prototype = Dt(L.prototype), $.prototype._superConstructor = L, $.prototype._makeResult = U, $.prototype._validationError = function() {
          return new Error("allSettled must be called with an array")
        }, tt.prototype = Dt(L.prototype), tt.prototype._superConstructor = L, tt.prototype._init = function() {
          this._result = {}
        }, tt.prototype._validateInput = function(t) {
          return t && "object" == typeof t
        }, tt.prototype._validationError = function() {
          return new Error("Promise.hash must be called with an object")
        }, tt.prototype._enumerate = function() {
          var t = this,
            e = t.promise,
            n = t._input,
            r = [];
          for (var o in n) e._state === Ct && Object.prototype.hasOwnProperty.call(n, o) && r.push({
            position: o,
            entry: n[o]
          });
          var i = r.length;
          t._remaining = i;
          for (var u = void 0, a = 0; e._state === Ct && a < i; a++) u = r[a], t._eachEntry(u.entry, u.position)
        }, nt.prototype = Dt(tt.prototype), nt.prototype._superConstructor = L, nt.prototype._makeResult = U, nt.prototype._validationError = function() {
          return new Error("hashSettled must be called with an object")
        };
        var qt = 0,
          Ht = void 0,
          Mt = "undefined" != typeof window ? window : void 0,
          Kt = Mt || {},
          Yt = Kt.MutationObserver || Kt.WebKitMutationObserver,
          Ft = "undefined" == typeof self && "undefined" != typeof r && "[object process]" === {}.toString.call(r),
          Bt = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
          Vt = new Array(1e3),
          zt = void 0;
        zt = Ft ? dt() : Yt ? vt() : Bt ? _t() : void 0 === Mt && "function" == typeof t ? Tt() : Et();
        var Xt = void 0;
        if ("object" == typeof self) Xt = self;
        else {
          if ("object" != typeof o) throw new Error("no global: `self` or `global` found");
          Xt = o
        }
        var Zt;
        At.async = ht, At.after = function(t) {
          return setTimeout(t, 0)
        };
        var Wt = at,
          $t = function(t, e) {
            return At.async(t, e)
          };
        if ("undefined" != typeof window && "object" == typeof window.__PROMISE_INSTRUMENTATION__) {
          var Jt = window.__PROMISE_INSTRUMENTATION__;
          u("instrument", !0);
          for (var Qt in Jt) Jt.hasOwnProperty(Qt) && mt(Qt, Jt[Qt])
        }
        var te = (Zt = {
          cast: Wt,
          Promise: q,
          EventTarget: bt,
          all: W,
          allSettled: J,
          race: Q,
          hash: et,
          hashSettled: rt,
          rethrow: ot,
          defer: it,
          denodeify: V,
          configure: u,
          on: mt,
          off: wt,
          resolve: at,
          reject: st,
          map: ut
        }, gt(Zt, "async", $t), gt(Zt, "filter", lt), Zt);
        e.default = te, e.cast = Wt, e.Promise = q, e.EventTarget = bt, e.all = W, e.allSettled = J, e.race = Q, e.hash = et, e.hashSettled = rt, e.rethrow = ot, e.defer = it, e.denodeify = V, e.configure = u, e.on = mt, e.off = wt, e.resolve = at, e.reject = st, e.map = ut, e.async = $t, e.filter = lt, Object.defineProperty(e, "__esModule", {
          value: !0
        })
      })
    }).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {
    _process: 4
  }],
  6: [function(t, e, n) {
    (function(n) {
      "use strict";
      var r = t("node.extend"),
        o = t("./utils"),
        i = t("./constants"),
        u = t("./storage"),
        a = t("./version"),
        s = n.BaaS || {};
      s._config = o.getConfig(), r(s._config, {
        VERSION: a
      }), s.init = function(t) {
        if ("[object String]" !== Object.prototype.toString.apply(t)) throw new Error("非法 clientID");
        s._config.CLIENT_ID = t
      }, s.getAuthToken = function() {
        return u.get(i.STORAGE_KEY.AUTH_TOKEN)
      }, s.isLogined = function() {
        return u.get(i.STORAGE_KEY.IS_LOGINED_BAAS)
      }, s.check = function() {
        if (!s.getAuthToken()) throw new Error("未认证客户端");
        if (!s.isLogined()) throw new Error("未登录")
      }, s.clearSession = function() {
        u.set(i.STORAGE_KEY.AUTH_TOKEN, ""), u.set(i.STORAGE_KEY.IS_LOGINED_BAAS, ""), u.set(i.STORAGE_KEY.USERINFO, ""), u.set(i.STORAGE_KEY.UID, "")
      }, e.exports = s
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {
    "./constants": 10,
    "./storage": 16,
    "./utils": 19,
    "./version": 20,
    "node.extend": 2
  }],
  7: [function(t, e, n) {
    "use strict";
    var r = t("./promise"),
      o = t("./request"),
      i = t("node.extend"),
      u = t("./utils"),
      a = t("./user"),
      s = t("./constants"),
      c = t("./baas"),
      f = t("./storage"),
      l = !1,
      h = !1,
      d = [],
      p = [],
      v = function() {
        return f.get(s.STORAGE_KEY.UID) ? new r(function(t, e) {
          t()
        }) : h ? new r(function(t, e) {
          d.push(t)
        }) : (h = !0, a.auth().then(function() {
          return setTimeout(function() {
            for (; d.length;) d.shift()()
          }, 0), new r(function(t, e) {
            t()
          })
        }, function(t) {
          throw new Error(t)
        }))
      },
      _ = function() {
        return c.isLogined() ? new r(function(t, e) {
          t(f.get(s.STORAGE_KEY.USERINFO))
        }) : l ? new r(function(t, e) {
          p.push(t)
        }) : (l = !0, v().then(function() {
          return a.login()
        }).then(function() {
          return setTimeout(function() {
            for (; p.length;) p.shift()(f.get(s.STORAGE_KEY.USERINFO))
          }, 0), new r(function(t, e) {
            t(f.get(s.STORAGE_KEY.USERINFO))
          })
        }).catch(function(t) {
          throw new Error(t)
        }))
      },
      E = function(t) {
        var e = arguments;
        t.url, t.method, t.data, t.header, t.dataType;
        return _().then(function() {
          return l = !1, o.apply(null, e)
        }, function(t) {
          throw new Error(t)
        })
      },
      y = function(t) {
        var e = {
          GET: s.STATUS_CODE.SUCCESS,
          POST: s.STATUS_CODE.CREATED,
          PUT: s.STATUS_CODE.UPDATE,
          PATCH: s.STATUS_CODE.PATCH,
          DELETE: s.STATUS_CODE.DELETE
        };
        for (var n in t) t.hasOwnProperty(n) && (c[n] = function(n) {
          var o = t[n];
          return function(t) {
            var n = o.method || "GET";
            o.defaultParams && (t = i(o.defaultParams, t));
            var a = u.format(o.url, t),
              c = t && t.data || t;
            return c = u.excludeParams(o.url, c), new r(function(t, r) {
              return E({
                url: a,
                method: n,
                data: c
              }).then(function(o) {
                o.statusCode == e[n] ? t(o) : r(s.MSG.STATUS_CODE_ERROR)
              }, function(t) {
                r(t)
              })
            })
          }
        }(n))
      },
      T = function() {
        var t = c._config.METHOD_MAP_LIST;
        t.map(function(t) {
          y(t)
        })
      };
    e.exports = {
      baasRequest: E,
      login: _,
      auth: v,
      createRequestMethod: T,
      doCreateRequestMethod: y
    }
  }, {
    "./baas": 6,
    "./constants": 10,
    "./promise": 14,
    "./request": 15,
    "./storage": 16,
    "./user": 18,
    "./utils": 19,
    "node.extend": 2
  }],
  8: [function(t, e, n) {
    "use strict"
  }, {}],
  9: [function(t, e, n) {
    "use strict";
    var r = "https://sso.ifanr.com",
      o = {
        INIT: "/hserve/v1/session/init/",
        LOGIN: "/hserve/v1/session/authenticate/",
        LOGOUT: "/hserve/v1/session/destroy/",
        PAY: "/hserve/v1/wechat/pay/order/",
        ORDER: "/hserve/v1/wechat/pay/order/:transactionID/",
        UPLOAD: r + "/hserve/v1/file/upload/",
        CONTENT_LIST: "/hserve/v1/content/detail/",
        CONTENT_GROUP_LIST: "/hserve/v1/content/group/",
        CONTENT_DETAIL: "/hserve/v1/content/detail/:richTextID/",
        CONTENT_GROUP_DETAIL: "/hserve/v1/content/category/",
        CONTENT_CATEGORY_DETAIL: "/hserve/v1/content/category/:categoryID/",
        TABLE_LIST: "/hserve/v1/table/",
        TABLE_DETAIL: "/hserve/v1/table/:tableID/",
        RECORD_LIST: "/hserve/v1/table/:tableID/record/",
        RECORD_DETAIL: "/hserve/v1/table/:tableID/record/:recordID/",
        CREATE_RECORD: "/hserve/v1/table/:tableID/record/",
        UPDATE_RECORD: "/hserve/v1/table/:tableID/record/:recordID/",
        DELETE_RECORD: "/hserve/v1/table/:tableID/record/:recordID/",
        USER_INFO: "/hserve/v1/user/info/:userID/"
      },
      i = [{
        getUserInfo: {
          url: o.USER_INFO,
          defaultParams: {
            userID: ""
          }
        }
      }, {
        getTableList: {
          url: o.TABLE_LIST
        },
        getTable: {
          url: o.TABLE_DETAIL
        },
        getRecordList: {
          url: o.RECORD_LIST
        },
        getRecord: {
          url: o.RECORD_DETAIL
        },
        createRecord: {
          url: o.CREATE_RECORD,
          method: "POST"
        },
        updateRecord: {
          url: o.UPDATE_RECORD,
          method: "PUT"
        },
        deleteRecord: {
          url: o.DELETE_RECORD,
          method: "DELETE"
        }
      }, {
        getContentList: {
          url: o.CONTENT_LIST
        },
        getContent: {
          url: o.CONTENT_DETAIL
        },
        getContentGroupList: {
          url: o.CONTENT_GROUP_LIST
        },
        getContentGroup: {
          url: o.CONTENT_GROUP_DETAIL
        },
        getContentCategory: {
          url: o.CONTENT_CATEGORY_DETAIL
        }
      }];
    e.exports = {
      API_HOST: r,
      API: o,
      AUTH_PREFIX: "Hydrogen-r1",
      METHOD_MAP_LIST: i,
      DEBUG: !1
    }
  }, {}],
  10: [function(t, e, n) {
    "use strict";
    e.exports = {
      STORAGE_KEY: {
        AUTH_TOKEN: "auth_token",
        USERINFO: "userinfo",
        UID: "uid",
        IS_LOGINED_BAAS: "is_logined_baas"
      },
      MSG: {
        STATUS_CODE_ERROR: "Unexpected API Status Code",
        NETWORT_ERROR: "Network Error"
      },
      STATUS_CODE: {
        CREATED: 201,
        SUCCESS: 200,
        UPDATE: 200,
        PATCH: 200,
        DELETE: 204,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        SERVER_ERROR: 500
      },
      UPLOAD: {
        UPLOAD_FILE_KEY: "file",
        HEADER_AUTH: "Authorization",
        HEADER_CLIENT: "X-Hydrogen-Client-ID",
        HEADER_AUTH_VALUE: "Hydrogen-r1 "
      }
    }
  }, {}],
  11: [function(t, e, n) {
    "use strict";
    var r = t("./baas");
    r.Promise = t("./promise"), r.storage = t("./storage"), r.request = t("./request"), r.pay = t("./pay"), r.auth = t("./baasRequest").auth, r.login = t("./baasRequest").login, r.logout = t("./user").logout, r.uploadFile = t("./uploadFile"), r.order = t("./order"), t("./baasRequest").createRequestMethod(), "undefined" != typeof wx && (wx.BaaS = r), e.exports = r
  }, {
    "./baas": 6,
    "./baasRequest": 7,
    "./order": 12,
    "./pay": 13,
    "./promise": 14,
    "./request": 15,
    "./storage": 16,
    "./uploadFile": 17,
    "./user": 18
  }],
  12: [function(t, e, n) {
    "use strict";
    var r = t("./baasRequest").baasRequest,
      o = t("./baas"),
      i = o._config.API,
      u = (t("./constants"), t("./utils")),
      a = t("./promise"),
      s = function(t) {
        var e = u.format(i.ORDER, {
          transactionID: t.transactionID
        });
        return r({
          url: e
        }).then(function(t) {
          return new a(function(e, n) {
            return e(t)
          }, function(t) {
            return reject(t)
          })
        }, function(t) {
          throw new Error(t)
        })
      };
    e.exports = s
  }, {
    "./baas": 6,
    "./baasRequest": 7,
    "./constants": 10,
    "./promise": 14,
    "./utils": 19
  }],
  13: [function(t, e, n) {
    "use strict";
    var r = t("./baasRequest").baasRequest,
      o = t("./baas"),
      i = t("./promise"),
      u = o._config.API,
      a = {
        merchandiseSchemaID: "merchandise_schema_id",
        merchandiseRecordID: "merchandise_record_id",
        merchandiseSnapshot: "merchandise_snapshot",
        merchandiseDescription: "merchandise_description",
        totalCost: "total_cost"
      },
      s = function(t) {
        var e = {};
        for (var n in t) e[a[n]] = t[n];
        return r({
          url: u.PAY,
          method: "POST",
          data: e
        }).then(function(t) {
          var e = t.data || {};
          return new i(function(t, n) {
            wx.requestPayment({
              appId: e.appId,
              timeStamp: e.timeStamp,
              nonceStr: e.nonceStr,
              package: e.package,
              signType: "MD5",
              paySign: e.paySign,
              success: function(n) {
                return n.transaction_no = e.transaction_no, t(n)
              },
              fail: function(t) {
                return n(t)
              }
            })
          }, function(t) {
            throw new Error(t)
          })
        }, function(t) {
          throw new Error(t)
        })
      };
    e.exports = s
  }, {
    "./baas": 6,
    "./baasRequest": 7,
    "./promise": 14
  }],
  14: [function(t, e, n) {
    "use strict";
    var r = t("rsvp").Promise;
    e.exports = r
  }, {
    rsvp: 5
  }],
  15: [function(t, e, n) {
    "use strict";
    var r = t("./promise"),
      o = t("node.extend"),
      i = t("./utils"),
      u = t("./constants"),
      a = t("./baas"),
      s = (t("./storage"), function(t) {
        var e = {
            "X-Hydrogen-Client-ID": a._config.CLIENT_ID,
            "X-Hydrogen-Client-Version": a._config.VERSION,
            "X-Hydrogen-Client-Platform": "undefined" != typeof window && window.navigator.platform || "UNKNOWN"
          },
          n = a.getAuthToken();
        return n && (e.Authorization = a._config.AUTH_PREFIX + " " + n), o(e, t || {})
      }),
      c = function(t) {
        var e = t.url,
          n = t.method,
          o = void 0 === n ? "GET" : n,
          c = t.data,
          f = void 0 === c ? {} : c,
          l = t.header,
          h = void 0 === l ? {} : l,
          d = t.dataType,
          p = void 0 === d ? "json" : d;
        return new r(function(t, n) {
          a._config.CLIENT_ID || n("未初始化客户端");
          var r = s(h);
          /https:\/\//.test(e) || (e = a._config.API_HOST + e), wx.request({
            method: o,
            url: e,
            data: f,
            header: r,
            dataType: p,
            success: function(e) {
              e.statusCode == u.STATUS_CODE.UNAUTHORIZED && a.clearSession(), t(e)
            },
            fail: function(t) {
              throw new Error(t.errMsg)
            }
          }), i.log("Request => " + e)
        })
      };
    e.exports = c
  }, {
    "./baas": 6,
    "./constants": 10,
    "./promise": 14,
    "./storage": 16,
    "./utils": 19,
    "node.extend": 2
  }],
  16: [function(t, e, n) {
    "use strict";
    var r = "ifx_baas_";
    e.exports = {
      set: function(t, e) {
        try {
          wx.setStorageSync(r + t, e)
        } catch (t) {
          throw new Error(t)
        }
      },
      get: function(t) {
        try {
          return wx.getStorageSync(r + t)
        } catch (t) {
          throw new Error(t)
        }
      }
    }
  }, {}],
  17: [function(t, e, n) {
    "use strict";
    var r = t("./baasRequest").baasRequest,
      o = t("./baas"),
      i = o._config.API,
      u = t("./constants"),
      a = t("./promise"),
      s = function(t) {
        return r({
          url: i.UPLOAD
        }).then(function(e) {
          var n = o.getAuthToken();
          if (!n) var r = setInterval(function() {
            n = o.getAuthToken(), n && clearInterval(r)
          }, 500);
          return new a(function(e, r) {
            wx.uploadFile({
              url: i.UPLOAD,
              filePath: t.filePath,
              name: u.UPLOAD.UPLOAD_FILE_KEY,
              formData: t.formData,
              header: {
                Authorization: u.UPLOAD.HEADER_AUTH_VALUE + n,
                "X-Hydrogen-Client-ID": o._config.CLIENT_ID
              },
              success: function(t) {
                return e(t)
              },
              fail: function(t) {
                return r(t)
              }
            })
          }, function(t) {
            throw new Error(t)
          })
        })
      };
    e.exports = s
  }, {
    "./baas": 6,
    "./baasRequest": 7,
    "./constants": 10,
    "./promise": 14
  }],
  18: [function(t, e, n) {
    "use strict";
    var r = t("./request"),
      o = t("./baas"),
      i = t("./constants"),
      u = (t("./utils"), t("./storage")),
      a = t("./promise"),
      s = o._config.API,
      c = function(t, e, n) {
        return r({
          url: s.INIT,
          method: "POST",
          data: {
            code: t
          }
        }).then(function(t) {
          t.statusCode == i.STATUS_CODE.CREATED ? (u.set(i.STORAGE_KEY.UID, t.data.user_id), u.set(i.STORAGE_KEY.AUTH_TOKEN, t.data.token), e(t)) : n(i.MSG.STATUS_CODE_ERROR)
        }, function(t) {
          n(t)
        })
      },
      f = function() {
        return new a(function(t, e) {
          wx.login({
            success: function(n) {
              return c(n.code, t, e)
            },
            fail: function(t) {
              e(t)
            }
          })
        })
      },
      l = function(t, e, n) {
        return r({
          url: s.LOGIN,
          method: "POST",
          data: t
        }).then(function(t) {
          t.statusCode == i.STATUS_CODE.CREATED ? (u.set(i.STORAGE_KEY.IS_LOGINED_BAAS, "1"), e(t)) : n(i.MSG.STATUS_CODE_ERROR)
        }, function(t) {
          n(t)
        })
      },
      h = function() {
        if (!o.getAuthToken()) throw new Error("未认证客户端");
        return new a(function(t, e) {
          wx.getUserInfo({
            success: function(n) {
              var r = {
                rawData: n.rawData,
                signature: n.signature,
                encryptedData: n.encryptedData,
                iv: n.iv
              };
              return u.set(i.STORAGE_KEY.USERINFO, n.userInfo), l(r, t, e)
            },
            fail: function(e) {
              t("")
            }
          })
        })
      },
      d = function() {
        return o.check(), r({
          url: s.LOGOUT,
          method: "POST"
        }).then(function(t) {
          if (t.statusCode != i.STATUS_CODE.CREATED) throw new Error(i.MSG.STATUS_CODE_ERROR);
          o.clearSession()
        }, function(t) {
          throw new Error(t)
        })
      };
    e.exports = {
      auth: f,
      login: h,
      logout: d
    }
  }, {
    "./baas": 6,
    "./constants": 10,
    "./promise": 14,
    "./request": 15,
    "./storage": 16,
    "./utils": 19
  }],
  19: [function(t, e, n) {
    "use strict";
    var r = void 0;
    try {
      r = t("./config.js")
    } catch (e) {
      r = t("./config.dev")
    }
    var o = function() {
        return r
      },
      i = function(t) {
        "undefined" != typeof BaaS && BaaS.test || !o().DEBUG || console.log("BaaS LOG: " + t)
      },
      u = function(t, e) {
        e = e || {};
        for (var n in e) {
          var r = new RegExp(":" + n, "g");
          t = t.replace(r, e[n])
        }
        return t.replace(/([^:])\/\//g, function(t, e) {
          return e + "/"
        })
      },
      a = function(t, e) {
        return t.replace(/:(\w*)/g, function(t, n) {
          void 0 !== e[n] && delete e[n]
        }), e
      };
    e.exports = {
      log: i,
      format: u,
      excludeParams: a,
      getConfig: o
    }
  }, {
    "./config.dev": 8,
    "./config.js": 9
  }],
  20: [function(t, e, n) {
    "use strict";
    e.exports = "v1.0.3"
  }, {}]
}, {}, [11]);
