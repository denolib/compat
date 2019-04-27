import { test, runIfMain } from "https://deno.land/std/testing/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";
import * as util from "../../util/main.ts";

test({
  name: "[util] isBoolean",
  fn() {
    assert(util.isBoolean(true));
    assert(util.isBoolean(new Boolean()));
    assert(util.isBoolean(new Boolean(true)));
    assert(util.isBoolean(false));
    assert(!util.isBoolean("deno"));
    assert(!util.isBoolean("true"));
  }
});

test({
  name: "[util] isNull",
  fn() {
    let n;
    assert(util.isNull(null));
    assert(!util.isNull(n));
    assert(!util.isNull(0));
    assert(!util.isNull({}));
  }
});

test({
  name: "[util] isNullOrUndefined",
  fn() {
    let n;
    assert(util.isNullOrUndefined(null));
    assert(util.isNullOrUndefined(n));
    assert(!util.isNullOrUndefined({}));
    assert(!util.isNullOrUndefined("undefined"));
  }
});

test({
  name: "[util] isNumber",
  fn() {
    assert(util.isNumber(666));
    assert(util.isNumber(new Number(666)));
    assert(!util.isNumber("999"));
    assert(!util.isNumber(null));
  }
});

test({
  name: "[util] isString",
  fn() {
    assert(util.isString("deno"));
    assert(util.isString(new String("DIO")));
    assert(!util.isString(1337));
  }
});

test({
  name: "[util] isSymbol",
  fn() {}
});

test({
  name: "[util] isUndefined",
  fn() {
    let t;
    assert(util.isUndefined(t));
    assert(!util.isUndefined("undefined"));
    assert(!util.isUndefined({}));
  }
});

test({
  name: "[util] isObject",
  fn() {
    let dio = { stand: "Za Warudo" };
    assert(util.isObject(dio));
    assert(util.isObject(new RegExp(/Toki Wo Tomare/)));
    assert(!util.isObject("Jotaro"));
  }
});

test({
  name: "[util] isError",
  fn() {
    const java = new Error();
    const nodejs = new TypeError();
    const deno = "Future";
    assert(util.isError(java));
    assert(util.isError(nodejs));
    assert(!util.isError(deno));
  }
});

test({
  name: "[util] isFunction",
  fn() {
    let f = function() {};
    assert(util.isFunction(f));
    assert(!util.isFunction({}));
    assert(!util.isFunction(new RegExp(/f/)));
  }
});

test({
  name: "[util] isRegExp",
  fn() {
    assert(util.isRegExp(new RegExp(/f/)));
    assert(util.isRegExp(/fuManchu/));
    assert(!util.isRegExp({ evil: "eye" }));
    assert(!util.isRegExp(null));
  }
});

test({
  name: "[util] isArray",
  fn() {
    assert(util.isArray([]));
    assert(util.isArray(new Array()));
    assert(!util.isArray({ yaNo: "array" }));
    assert(!util.isArray(null));
  }
});

runIfMain(import.meta);
