/* Selector de idioma. No usa cookies ni envía nada: solo ?lang= en la URL y localStorage. */
(function () {
  var d = document.documentElement, KEY = "rls-lang";
  function get() {
    var q = /[?&]lang=(es|en)\b/.exec(location.search);
    if (q) return q[1];
    try { var s = localStorage.getItem(KEY); if (s === "es" || s === "en") return s; } catch (e) {}
    return (navigator.language || "es").slice(0, 2) === "en" ? "en" : "es";
  }
  function apply(l, save) {
    d.setAttribute("lang", l); d.setAttribute("data-lang", l);
    var t = document.querySelector("title");
    if (t && t.getAttribute("data-" + l)) document.title = t.getAttribute("data-" + l);
    var m = document.querySelector('meta[name="description"]');
    if (m && m.getAttribute("data-" + l)) m.setAttribute("content", m.getAttribute("data-" + l));
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === l));
    });
    if (save) {
      try { localStorage.setItem(KEY, l); } catch (e) {}
      try { var u = new URL(location.href); u.searchParams.set("lang", l); history.replaceState(null, "", u); } catch (e) {}
    }
    document.querySelectorAll("a[data-keep-lang]").forEach(function (a) {
      var u = new URL(a.getAttribute("href"), location.href); u.searchParams.set("lang", l);
      a.setAttribute("href", u.pathname + u.search + u.hash);
    });
  }
  apply(get(), false);
  document.addEventListener("DOMContentLoaded", function () {
    apply(get(), false);
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-set-lang"), true); });
    });
  });
})();
