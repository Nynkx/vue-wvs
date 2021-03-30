!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.preloadJrWorker = t())
    : (e.preloadJrWorker = t());
})(self, function() {
  return (function(e) {
    var t = {};
    function r(n) {
      if (t[n]) return t[n].exports;
      var o = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (r.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (r.t = function(e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var o in e)
            r.d(
              n,
              o,
              function(t) {
                return e[t];
              }.bind(null, o)
            );
        return n;
      }),
      (r.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return r.d(t, "a", t), t;
      }),
      (r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.p = ""),
      r((r.s = 0))
    );
  })([
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = function(e) {
          var t = e.workerBlobUrl,
            r = (e.workerPath || "") + "WebPDFJRWorker.js?h=" + s.h,
            n = t || r,
            o = new Worker(n);
          c && (o.terminate(), (o = new Worker(n)));
          var a = "FoxitPDFSDKForWeb_JREngineCache_",
            i = a + "wasmBinary",
            u = (function() {
              var e = !1,
                t = void 0,
                r = void 0,
                n = void 0,
                o = [];
              return {
                resolve: function(n) {
                  e || ((e = !0), (t = 1), (r = n)), a();
                },
                reject: function(r) {
                  e || ((e = !0), (t = 2), (n = r)), a();
                },
                promise: {
                  then: function(e, t) {
                    o.push([e, t]), a();
                  },
                },
              };
              function a() {
                var e = void 0;
                switch (t) {
                  case 1:
                    e = r;
                    break;
                  case 2:
                    e = n;
                    break;
                  default:
                    return;
                }
                for (var a = 0, i = o.length; a < i; a++) o[a][t - 1](e);
                o = [];
              }
            })(),
            l = u.promise;
          o.addEventListener("message", function e(t) {
            var r,
              n = t.data,
              a = n.params;
            if ((r = n.uiListener))
              switch (r) {
                case "wasmBinary":
                  localStorage.setItem(i, a);
                  break;
                case "asmMem":
                  localStorage.setItem(
                    "FoxitPDFSDKForWeb_JREngineCache_asmMem",
                    a
                  );
                  break;
                case "asmJs":
                  localStorage.setItem(
                    "FoxitPDFSDKForWeb_JREngineCache_asmJs",
                    a
                  );
              }
            else {
              var s = n.callId;
              if (s)
                "compatibilityURL" === s &&
                  o.postMessage({
                    backId: n.backId,
                    params: URL.createObjectURL(a),
                  });
              else if ("initJREngine" === (s = n.id)) {
                var c = +n.type;
                u[["resolve", "reject"][c]](a),
                  o.removeEventListener("message", e),
                  o.removeEventListener("error", e);
              }
            }
          }),
            o.addEventListener("error", function(e) {
              o.terminate(), u.reject(e);
            });
          var f = {},
            d = void 0;
          return (
            (d = localStorage.getItem(i)) && (f.wasmBinary = d),
            (d = localStorage.getItem(
              "FoxitPDFSDKForWeb_JREngineCache_asmMem"
            )) && (f.asmMem = d),
            (d = localStorage.getItem(
              "FoxitPDFSDKForWeb_JREngineCache_asmJs"
            )) && (f.asmJs = d),
            (e.cache = f),
            (e.compatibilityURL = "compatibilityURL"),
            (e.d = location.href),
            o.postMessage({
              name: "initJREngine",
              params: e,
              id: "initJREngine",
            }),
            { worker: o, initJREnginePromise: l }
          );
        });
      var n,
        o,
        a,
        i,
        s = r(1),
        c =
          ((n = navigator.userAgent.toLowerCase()),
          (o = /msie/.test(n)),
          (a = /trident/.test(n)),
          (i = /opera|opr/.test(n)),
          (a || o) && !i && "msSaveBlob" in navigator);
    },
    function(e, t, r) {
      "use strict";
      r.r(t),
        r.d(t, "h", function() {
          return n;
        });
      var n = "c219c37d4797459d7e82615b56bbecd4";
    },
  ]).default;
});
