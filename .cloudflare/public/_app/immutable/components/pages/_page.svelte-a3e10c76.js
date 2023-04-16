import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, q as text, a as space, J as svg_element, l as claim_element, m as children, r as claim_text, h as detach, c as claim_space, K as claim_svg_element, n as attr, b as insert_hydration, H as append_hydration, L as action_destroyer, M as listen, C as noop, N as run_all, u as set_data } from "../../chunks/index-0c191f98.js";
import { p as parse } from "../../chunks/parse-a9b5aeea.js";
import { l as client } from "../../chunks/singletons-5c8d2b5b.js";
client.disable_scroll_handling;
client.goto;
client.invalidate;
const invalidateAll = client.invalidateAll;
client.preload_data;
client.preload_code;
client.before_navigate;
client.after_navigate;
const applyAction = client.apply_action;
function deserialize(result) {
  const parsed = JSON.parse(result);
  if (parsed.data) {
    parsed.data = parse(parsed.data);
  }
  return parsed;
}
function enhance(form, submit = () => {
}) {
  const fallback_callback = async ({ action, result, reset }) => {
    if (result.type === "success") {
      if (reset !== false) {
        HTMLFormElement.prototype.reset.call(form);
      }
      await invalidateAll();
    }
    if (location.origin + location.pathname === action.origin + action.pathname || result.type === "redirect" || result.type === "error") {
      applyAction(result);
    }
  };
  async function handle_submit(event) {
    var _a, _b, _c;
    event.preventDefault();
    const action = new URL(
      // We can't do submitter.formAction directly because that property is always set
      // We do cloneNode for avoid DOM clobbering - https://github.com/sveltejs/kit/issues/7593
      ((_a = event.submitter) == null ? void 0 : _a.hasAttribute("formaction")) ? (
        /** @type {HTMLButtonElement | HTMLInputElement} */
        event.submitter.formAction
      ) : (
        /** @type {HTMLFormElement} */
        HTMLFormElement.prototype.cloneNode.call(form).action
      )
    );
    const data = new FormData(form);
    const submitter_name = (_b = event.submitter) == null ? void 0 : _b.getAttribute("name");
    if (submitter_name) {
      data.append(submitter_name, ((_c = event.submitter) == null ? void 0 : _c.getAttribute("value")) ?? "");
    }
    const controller = new AbortController();
    let cancelled = false;
    const cancel = () => cancelled = true;
    const callback = await submit({
      action,
      cancel,
      controller,
      data,
      form
    }) ?? fallback_callback;
    if (cancelled)
      return;
    let result;
    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-sveltekit-action": "true"
        },
        cache: "no-store",
        body: data,
        signal: controller.signal
      });
      result = deserialize(await response.text());
      if (result.type === "error")
        result.status = response.status;
    } catch (error) {
      if (
        /** @type {any} */
        (error == null ? void 0 : error.name) === "AbortError"
      )
        return;
      result = { type: "error", error };
    }
    callback({
      action,
      data,
      form,
      update: (opts) => fallback_callback({ action, result, reset: opts == null ? void 0 : opts.reset }),
      // @ts-expect-error generic constraints stuff we don't care about
      result
    });
  }
  HTMLFormElement.prototype.addEventListener.call(form, "submit", handle_submit);
  return {
    destroy() {
      HTMLFormElement.prototype.removeEventListener.call(form, "submit", handle_submit);
    }
  };
}
function create_if_block_2(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*error*/
        ctx[1]
      );
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t = claim_text(
        span_nodes,
        /*error*/
        ctx[1]
      );
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "my-auto text-red-500");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      append_hydration(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*error*/
      2)
        set_data(
          t,
          /*error*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create_if_block_1(ctx) {
  let svg;
  let circle;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      circle = svg_element("circle");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        class: true,
        xmlns: true,
        fill: true,
        viewBox: true
      });
      var svg_nodes = children(svg);
      circle = claim_svg_element(svg_nodes, "circle", {
        class: true,
        cx: true,
        cy: true,
        r: true,
        stroke: true,
        "stroke-width": true
      });
      children(circle).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", { class: true, fill: true, d: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(circle, "class", "opacity-25");
      attr(circle, "cx", "12");
      attr(circle, "cy", "12");
      attr(circle, "r", "10");
      attr(circle, "stroke", "currentColor");
      attr(circle, "stroke-width", "4");
      attr(path, "class", "opacity-75");
      attr(path, "fill", "currentColor");
      attr(path, "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z");
      attr(svg, "class", "my-auto animate-spin h-5 w-5 text-black");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, circle);
      append_hydration(svg, path);
    },
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function create_if_block(ctx) {
  let div;
  let t0;
  let article;
  let t1;
  let t2;
  return {
    c() {
      div = element("div");
      t0 = space();
      article = element("article");
      t1 = text("Summary: ");
      t2 = text(
        /*summary*/
        ctx[2]
      );
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      t0 = claim_space(nodes);
      article = claim_element(nodes, "ARTICLE", { class: true });
      var article_nodes = children(article);
      t1 = claim_text(article_nodes, "Summary: ");
      t2 = claim_text(
        article_nodes,
        /*summary*/
        ctx[2]
      );
      article_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "h-10");
      attr(article, "class", "prose");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, article, anchor);
      append_hydration(article, t1);
      append_hydration(article, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*summary*/
      4)
        set_data(
          t2,
          /*summary*/
          ctx2[2]
        );
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(article);
    }
  };
}
function create_fragment(ctx) {
  let main;
  let h1;
  let t0;
  let t1;
  let p0;
  let t2;
  let a;
  let t3;
  let t4;
  let t5;
  let form;
  let label;
  let div;
  let svg;
  let path;
  let t6;
  let p1;
  let span0;
  let t7;
  let t8;
  let t9;
  let p2;
  let t10;
  let t11;
  let input;
  let t12;
  let span1;
  let t13;
  let t14;
  let button;
  let t15;
  let t16;
  let mounted;
  let dispose;
  let if_block0 = (
    /*error*/
    ctx[1] && create_if_block_2(ctx)
  );
  let if_block1 = (
    /*loading*/
    ctx[0] && create_if_block_1()
  );
  let if_block2 = (
    /*summary*/
    ctx[2] && create_if_block(ctx)
  );
  return {
    c() {
      main = element("main");
      h1 = element("h1");
      t0 = text("PDF Summarizer");
      t1 = space();
      p0 = element("p");
      t2 = text("Example made wiith ");
      a = element("a");
      t3 = text("sveltekit-modal");
      t4 = text(".");
      t5 = space();
      form = element("form");
      label = element("label");
      div = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t6 = space();
      p1 = element("p");
      span0 = element("span");
      t7 = text("Click to upload");
      t8 = text(" or drag and drop");
      t9 = space();
      p2 = element("p");
      t10 = text("PDF");
      t11 = space();
      input = element("input");
      t12 = space();
      span1 = element("span");
      if (if_block0)
        if_block0.c();
      t13 = space();
      if (if_block1)
        if_block1.c();
      t14 = space();
      button = element("button");
      t15 = text("Summarize!");
      t16 = space();
      if (if_block2)
        if_block2.c();
      this.h();
    },
    l(nodes) {
      main = claim_element(nodes, "MAIN", { class: true });
      var main_nodes = children(main);
      h1 = claim_element(main_nodes, "H1", { class: true });
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "PDF Summarizer");
      h1_nodes.forEach(detach);
      t1 = claim_space(main_nodes);
      p0 = claim_element(main_nodes, "P", {});
      var p0_nodes = children(p0);
      t2 = claim_text(p0_nodes, "Example made wiith ");
      a = claim_element(p0_nodes, "A", {
        target: true,
        rel: true,
        class: true,
        href: true
      });
      var a_nodes = children(a);
      t3 = claim_text(a_nodes, "sveltekit-modal");
      a_nodes.forEach(detach);
      t4 = claim_text(p0_nodes, ".");
      p0_nodes.forEach(detach);
      t5 = claim_space(main_nodes);
      form = claim_element(main_nodes, "FORM", { method: true, action: true, class: true });
      var form_nodes = children(form);
      label = claim_element(form_nodes, "LABEL", { class: true });
      var label_nodes = children(label);
      div = claim_element(label_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        xmlns: true,
        fill: true,
        viewBox: true,
        "stroke-width": true,
        stroke: true,
        class: true
      });
      var svg_nodes = children(svg);
      path = claim_svg_element(svg_nodes, "path", {
        "stroke-linecap": true,
        "stroke-linejoin": true,
        d: true
      });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      t6 = claim_space(div_nodes);
      p1 = claim_element(div_nodes, "P", { class: true });
      var p1_nodes = children(p1);
      span0 = claim_element(p1_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      t7 = claim_text(span0_nodes, "Click to upload");
      span0_nodes.forEach(detach);
      t8 = claim_text(p1_nodes, " or drag and drop");
      p1_nodes.forEach(detach);
      t9 = claim_space(div_nodes);
      p2 = claim_element(div_nodes, "P", { class: true });
      var p2_nodes = children(p2);
      t10 = claim_text(p2_nodes, "PDF");
      p2_nodes.forEach(detach);
      div_nodes.forEach(detach);
      t11 = claim_space(label_nodes);
      input = claim_element(label_nodes, "INPUT", {
        type: true,
        name: true,
        accept: true,
        class: true
      });
      label_nodes.forEach(detach);
      t12 = claim_space(form_nodes);
      span1 = claim_element(form_nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      if (if_block0)
        if_block0.l(span1_nodes);
      t13 = claim_space(span1_nodes);
      if (if_block1)
        if_block1.l(span1_nodes);
      t14 = claim_space(span1_nodes);
      button = claim_element(span1_nodes, "BUTTON", { type: true, class: true });
      var button_nodes = children(button);
      t15 = claim_text(button_nodes, "Summarize!");
      button_nodes.forEach(detach);
      span1_nodes.forEach(detach);
      t16 = claim_space(form_nodes);
      if (if_block2)
        if_block2.l(form_nodes);
      form_nodes.forEach(detach);
      main_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(h1, "class", "text-3xl font-bold underline");
      attr(a, "target", "_blank");
      attr(a, "rel", "noopener noreferrer");
      attr(a, "class", "underline");
      attr(a, "href", "https://github.com/semicognitive/sveltekit-modal/tree/main");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-linejoin", "round");
      attr(path, "d", "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "stroke-width", "1.5");
      attr(svg, "stroke", "currentColor");
      attr(svg, "class", "w-10 h-10 mb-3 text-neutral-400");
      attr(span0, "class", "font-semibold");
      attr(p1, "class", "mb-2 text-sm text-neutral-500");
      attr(p2, "class", "text-xs text-neutral-500");
      attr(div, "class", "flex flex-col items-center justify-center py-6");
      attr(input, "type", "file");
      attr(input, "name", "document");
      attr(input, "accept", "application/pdf");
      attr(input, "class", "hidden");
      attr(label, "class", "flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50");
      attr(button, "type", "submit");
      attr(button, "class", "inline-flex items-center rounded-md border border-transparent bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2");
      attr(span1, "class", "flex flex-row space-x-4 ml-auto");
      attr(form, "method", "POST");
      attr(form, "action", "/api/ask");
      attr(form, "class", "flex flex-col space-y-2 md:min-w-[28rem] lg:min-w-[32rem] xl:min-w-[36rem] max-w-6xl");
      attr(main, "class", "flex flex-col space-y-2");
    },
    m(target, anchor) {
      insert_hydration(target, main, anchor);
      append_hydration(main, h1);
      append_hydration(h1, t0);
      append_hydration(main, t1);
      append_hydration(main, p0);
      append_hydration(p0, t2);
      append_hydration(p0, a);
      append_hydration(a, t3);
      append_hydration(p0, t4);
      append_hydration(main, t5);
      append_hydration(main, form);
      append_hydration(form, label);
      append_hydration(label, div);
      append_hydration(div, svg);
      append_hydration(svg, path);
      append_hydration(div, t6);
      append_hydration(div, p1);
      append_hydration(p1, span0);
      append_hydration(span0, t7);
      append_hydration(p1, t8);
      append_hydration(div, t9);
      append_hydration(div, p2);
      append_hydration(p2, t10);
      append_hydration(label, t11);
      append_hydration(label, input);
      append_hydration(form, t12);
      append_hydration(form, span1);
      if (if_block0)
        if_block0.m(span1, null);
      append_hydration(span1, t13);
      if (if_block1)
        if_block1.m(span1, null);
      append_hydration(span1, t14);
      append_hydration(span1, button);
      append_hydration(button, t15);
      append_hydration(form, t16);
      if (if_block2)
        if_block2.m(form, null);
      if (!mounted) {
        dispose = [
          action_destroyer(enhance.call(
            null,
            form,
            /*api_ask*/
            ctx[3]
          )),
          listen(
            form,
            "change",
            /*change_handler*/
            ctx[4]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*error*/
        ctx2[1]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_2(ctx2);
          if_block0.c();
          if_block0.m(span1, t13);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*loading*/
        ctx2[0]
      ) {
        if (if_block1)
          ;
        else {
          if_block1 = create_if_block_1();
          if_block1.c();
          if_block1.m(span1, t14);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (
        /*summary*/
        ctx2[2]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block(ctx2);
          if_block2.c();
          if_block2.m(form, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(main);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let loading = false;
  let error;
  let summary;
  function api_ask() {
    $$invalidate(0, loading = true);
    $$invalidate(1, error = void 0);
    $$invalidate(2, summary = void 0);
    return ({ result }) => {
      $$invalidate(0, loading = false);
      $$invalidate(1, error = result.error);
      $$invalidate(2, summary = result.summary);
    };
  }
  const change_handler = () => ($$invalidate(1, error = void 0), $$invalidate(2, summary = void 0));
  return [loading, error, summary, api_ask, change_handler];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as default
};
