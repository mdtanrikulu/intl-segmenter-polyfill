(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IntlSegmenterPolyfillBundled = {}));
})(this, (function (exports) { 'use strict';

  function _loadWasmModule (sync, filepath, src, imports) {
    function _instantiateOrCompile(source, imports, stream) {
      var instantiateFunc = stream ? WebAssembly.instantiateStreaming : WebAssembly.instantiate;
      var compileFunc = stream ? WebAssembly.compileStreaming : WebAssembly.compile;

      if (imports) {
        return instantiateFunc(source, imports)
      } else {
        return compileFunc(source)
      }
    }

    var buf = null;
    var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

    if (filepath && isNode) {
      var fs = require("fs");
      var path = require("path");

      return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, filepath), (error, buffer) => {
          if (error != null) {
            reject(error);
          }

          resolve(_instantiateOrCompile(buffer, imports, false));
        });
      });
    } else if (filepath) {
      return _instantiateOrCompile(fetch(filepath), imports, true)
    }

    if (isNode) {
      buf = Buffer.from(src, 'base64');
    } else {
      var raw = globalThis.atob(src);
      var rawLength = raw.length;
      buf = new Uint8Array(new ArrayBuffer(rawLength));
      for(var i = 0; i < rawLength; i++) {
         buf[i] = raw.charCodeAt(i);
      }
    }

    if(sync) {
      var mod = new WebAssembly.Module(buf);
      return imports ? new WebAssembly.Instance(mod, imports) : mod
    } else {
      return _instantiateOrCompile(buf, imports, false)
    }
  }

  function break_iterator(imports){return _loadWasmModule(0, 'f18b20a40ee0bfcc.wasm', null, imports)}

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
      return this;
    });

    define(Gp, "toString", function() {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
  });

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line es-x/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var functionBindNative = !fails(function () {
    // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var FunctionPrototype$2 = Function.prototype;
  var bind$1 = FunctionPrototype$2.bind;
  var call$2 = FunctionPrototype$2.call;
  var uncurryThis = functionBindNative && bind$1.bind(call$2, call$2);

  var functionUncurryThis = functionBindNative ? function (fn) {
    return fn && uncurryThis(fn);
  } : function (fn) {
    return fn && function () {
      return call$2.apply(fn, arguments);
    };
  };

  var toString$1 = functionUncurryThis({}.toString);
  var stringSlice = functionUncurryThis(''.slice);

  var classofRaw = function (it) {
    return stringSlice(toString$1(it), 8, -1);
  };

  var Object$5 = global_1.Object;
  var split = functionUncurryThis(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$5('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split(it, '') : Object$5(it);
  } : Object$5;

  var TypeError$d = global_1.TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError$d("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var defineProperty$4 = Object.defineProperty;

  var setGlobal = function (key, value) {
    try {
      defineProperty$4(global_1, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store$1 = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store$1;

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.22.3',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.22.3/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });
  });

  var Object$4 = global_1.Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object$4(requireObjectCoercible(argument));
  };

  var hasOwnProperty = functionUncurryThis({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es-x/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
  };

  var id = 0;
  var postfix = Math.random();
  var toString = functionUncurryThis(1.0.toString);

  var uid = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
  };

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable = function (argument) {
    return typeof argument == 'function';
  };

  var aFunction = function (argument) {
    return isCallable(argument) ? argument : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global_1[namespace]) : global_1[namespace] && global_1[namespace][method];
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process$1 = global_1.process;
  var Deno = global_1.Deno;
  var versions = process$1 && process$1.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es-x/no-symbol -- required for testing */



  // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && engineV8Version && engineV8Version < 41;
  });

  /* eslint-disable es-x/no-symbol -- required for testing */


  var useSymbolAsUid = nativeSymbol
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var symbolFor = Symbol$1 && Symbol$1['for'];
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!hasOwnProperty_1(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (nativeSymbol && hasOwnProperty_1(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else if (useSymbolAsUid && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    } return WellKnownSymbolsStore[name];
  };

  var isObject = function (it) {
    return typeof it == 'object' ? it !== null : isCallable(it);
  };

  var String$3 = global_1.String;
  var TypeError$c = global_1.TypeError;

  // `Assert: Type(argument) is Object`
  var anObject = function (argument) {
    if (isObject(argument)) return argument;
    throw TypeError$c(String$3(argument) + ' is not an object');
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = descriptors && fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var call$1 = Function.prototype.call;

  var functionCall = functionBindNative ? call$1.bind(call$1) : function () {
    return call$1.apply(call$1, arguments);
  };

  var objectIsPrototypeOf = functionUncurryThis({}.isPrototypeOf);

  var Object$3 = global_1.Object;

  var isSymbol = useSymbolAsUid ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, Object$3(it));
  };

  var String$2 = global_1.String;

  var tryToString = function (argument) {
    try {
      return String$2(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var TypeError$b = global_1.TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable = function (argument) {
    if (isCallable(argument)) return argument;
    throw TypeError$b(tryToString(argument) + ' is not a function');
  };

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
  };

  var TypeError$a = global_1.TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = functionCall(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    throw TypeError$a("Can't convert object to primitive value");
  };

  var TypeError$9 = global_1.TypeError;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive = function (input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = functionCall(exoticToPrim, input, pref);
      if (!isObject(result) || isSymbol(result)) return result;
      throw TypeError$9("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var TypeError$8 = global_1.TypeError;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$5 = descriptors ? v8PrototypeDefineBug ? function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor$1(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$8('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$5
  };

  var ceil = Math.ceil;
  var floor$4 = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor$4 : ceil)(number);
  };

  var max$2 = Math.max;
  var min$3 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max$2(integer + length, 0) : min$3(integer, length);
  };

  var min$2 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min$2(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike = function (obj) {
    return toLength(obj.length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$2 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = lengthOfArrayLike(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false)
  };

  var hiddenKeys$1 = {};

  var indexOf = arrayIncludes.indexOf;


  var push$1 = functionUncurryThis([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwnProperty_1(hiddenKeys$1, key) && hasOwnProperty_1(O, key) && push$1(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwnProperty_1(O, key = names[i++])) {
      ~indexOf(result, key) || push$1(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es-x/no-object-keys -- safe
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es-x/no-object-defineproperties -- safe
  var f$4 = descriptors && !v8PrototypeDefineBug ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], props[key]);
    return O;
  };

  var objectDefineProperties = {
  	f: f$4
  };

  var html = getBuiltIn('document', 'documentElement');

  var keys$1 = shared('keys');

  var sharedKey = function (key) {
    return keys$1[key] || (keys$1[key] = uid(key));
  };

  /* global ActiveXObject -- old IE, WSH */








  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es-x/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties.f(result, Properties);
  };

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var functionToString = functionUncurryThis(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable(sharedStore.inspectSource)) {
    sharedStore.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap$1 = global_1.WeakMap;

  var nativeWeakMap = isCallable(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$7 = global_1.TypeError;
  var WeakMap = global_1.WeakMap;
  var set$1, get$1, has;

  var enforce = function (it) {
    return has(it) ? get$1(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get$1(it)).type !== TYPE) {
        throw TypeError$7('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap || sharedStore.state) {
    var store = sharedStore.state || (sharedStore.state = new WeakMap());
    var wmget = functionUncurryThis(store.get);
    var wmhas = functionUncurryThis(store.has);
    var wmset = functionUncurryThis(store.set);
    set$1 = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$7(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return wmget(store, it) || {};
    };
    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys$1[STATE] = true;
    set$1 = function (it, metadata) {
      if (hasOwnProperty_1(it, STATE)) throw new TypeError$7(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return hasOwnProperty_1(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwnProperty_1(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get$1,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$3 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$3
  };

  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (hasOwnProperty_1(O, P)) return createPropertyDescriptor(!functionCall(objectPropertyIsEnumerable.f, O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
  };

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var getDescriptor = descriptors && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwnProperty_1(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!descriptors || (descriptors && getDescriptor(FunctionPrototype$1, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var redefine = createCommonjsModule(function (module) {
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (!hasOwnProperty_1(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
        createNonEnumerableProperty(value, 'name', name);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable(this) && getInternalState(this).source || inspectSource(this);
  });
  });

  var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
  var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys);
  };

  var objectGetOwnPropertyNames = {
  	f: f$1
  };

  // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
  var f = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f
  };

  var concat = functionUncurryThis([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwnProperty_1(target, key) && !(exceptions && hasOwnProperty_1(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable(detection) ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO = sharedKey('IE_PROTO');
  var Object$2 = global_1.Object;
  var ObjectPrototype$2 = Object$2.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter ? Object$2.getPrototypeOf : function (O) {
    var object = toObject(O);
    if (hasOwnProperty_1(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof Object$2 ? ObjectPrototype$2 : null;
  };

  var ITERATOR$5 = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es-x/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable(IteratorPrototype$2[ITERATOR$5])) {
    redefine(IteratorPrototype$2, ITERATOR$5, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$3 = objectDefineProperty.f;



  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwnProperty_1(target, TO_STRING_TAG$3)) {
      defineProperty$3(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var String$1 = global_1.String;
  var TypeError$6 = global_1.TypeError;

  var aPossiblePrototype = function (argument) {
    if (typeof argument == 'object' || isCallable(argument)) return argument;
    throw TypeError$6("Can't set " + String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */




  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es-x/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
      setter = functionUncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$4]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$4])) {
            redefine(CurrentIteratorPrototype, ITERATOR$4, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME$1) {
        createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return functionCall(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
      redefine(IterablePrototype, ITERATOR$4, defaultIterator, { name: DEFAULT });
    }
    iterators[NAME] = defaultIterator;

    return methods;
  };

  var defineProperty$2 = objectDefineProperty.f;




  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$1 = internalState.set;
  var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$1(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  var values = iterators.Arguments = iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  // V8 ~ Chrome 45- bug
  if (descriptors && values.name !== 'values') try {
    defineProperty$2(values, 'name', { value: 'values' });
  } catch (error) { /* empty */ }

  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  var Object$1 = global_1.Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
  };

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  var ITERATOR$3 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$3] = function () {
      return this;
    };
    // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$3] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  // eslint-disable-next-line es-x/no-typed-arrays -- safe
  var arrayBufferNative = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

  var defineProperty$1 = objectDefineProperty.f;






  var Int8Array$4 = global_1.Int8Array;
  var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
  var Uint8ClampedArray$1 = global_1.Uint8ClampedArray;
  var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
  var TypedArray = Int8Array$4 && objectGetPrototypeOf(Int8Array$4);
  var TypedArrayPrototype$1 = Int8ArrayPrototype$1 && objectGetPrototypeOf(Int8ArrayPrototype$1);
  var ObjectPrototype$1 = Object.prototype;
  var TypeError$5 = global_1.TypeError;

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
  var TYPED_ARRAY_CONSTRUCTOR$1 = uid('TYPED_ARRAY_CONSTRUCTOR');
  // Fixing native typed arrays in Opera Presto crashes the browser, see #595
  var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferNative && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
  var TYPED_ARRAY_TAG_REQUIRED = false;
  var NAME, Constructor, Prototype;

  var TypedArrayConstructorsList = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8
  };

  var BigIntArrayConstructorsList = {
    BigInt64Array: 8,
    BigUint64Array: 8
  };

  var isView = function isView(it) {
    if (!isObject(it)) return false;
    var klass = classof(it);
    return klass === 'DataView'
      || hasOwnProperty_1(TypedArrayConstructorsList, klass)
      || hasOwnProperty_1(BigIntArrayConstructorsList, klass);
  };

  var isTypedArray = function (it) {
    if (!isObject(it)) return false;
    var klass = classof(it);
    return hasOwnProperty_1(TypedArrayConstructorsList, klass)
      || hasOwnProperty_1(BigIntArrayConstructorsList, klass);
  };

  var aTypedArray$m = function (it) {
    if (isTypedArray(it)) return it;
    throw TypeError$5('Target is not a typed array');
  };

  var aTypedArrayConstructor$2 = function (C) {
    if (isCallable(C) && (!objectSetPrototypeOf || objectIsPrototypeOf(TypedArray, C))) return C;
    throw TypeError$5(tryToString(C) + ' is not a typed array constructor');
  };

  var exportTypedArrayMethod$n = function (KEY, property, forced, options) {
    if (!descriptors) return;
    if (forced) for (var ARRAY in TypedArrayConstructorsList) {
      var TypedArrayConstructor = global_1[ARRAY];
      if (TypedArrayConstructor && hasOwnProperty_1(TypedArrayConstructor.prototype, KEY)) try {
        delete TypedArrayConstructor.prototype[KEY];
      } catch (error) {
        // old WebKit bug - some methods are non-configurable
        try {
          TypedArrayConstructor.prototype[KEY] = property;
        } catch (error2) { /* empty */ }
      }
    }
    if (!TypedArrayPrototype$1[KEY] || forced) {
      redefine(TypedArrayPrototype$1, KEY, forced ? property
        : NATIVE_ARRAY_BUFFER_VIEWS$1 && Int8ArrayPrototype$1[KEY] || property, options);
    }
  };

  var exportTypedArrayStaticMethod = function (KEY, property, forced) {
    var ARRAY, TypedArrayConstructor;
    if (!descriptors) return;
    if (objectSetPrototypeOf) {
      if (forced) for (ARRAY in TypedArrayConstructorsList) {
        TypedArrayConstructor = global_1[ARRAY];
        if (TypedArrayConstructor && hasOwnProperty_1(TypedArrayConstructor, KEY)) try {
          delete TypedArrayConstructor[KEY];
        } catch (error) { /* empty */ }
      }
      if (!TypedArray[KEY] || forced) {
        // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
        try {
          return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$1 && TypedArray[KEY] || property);
        } catch (error) { /* empty */ }
      } else return;
    }
    for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global_1[ARRAY];
      if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
        redefine(TypedArrayConstructor, KEY, property);
      }
    }
  };

  for (NAME in TypedArrayConstructorsList) {
    Constructor = global_1[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR$1, Constructor);
    else NATIVE_ARRAY_BUFFER_VIEWS$1 = false;
  }

  for (NAME in BigIntArrayConstructorsList) {
    Constructor = global_1[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR$1, Constructor);
  }

  // WebKit bug - typed arrays constructors prototype is Object.prototype
  if (!NATIVE_ARRAY_BUFFER_VIEWS$1 || !isCallable(TypedArray) || TypedArray === Function.prototype) {
    // eslint-disable-next-line no-shadow -- safe
    TypedArray = function TypedArray() {
      throw TypeError$5('Incorrect invocation');
    };
    if (NATIVE_ARRAY_BUFFER_VIEWS$1) for (NAME in TypedArrayConstructorsList) {
      if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME], TypedArray);
    }
  }

  if (!NATIVE_ARRAY_BUFFER_VIEWS$1 || !TypedArrayPrototype$1 || TypedArrayPrototype$1 === ObjectPrototype$1) {
    TypedArrayPrototype$1 = TypedArray.prototype;
    if (NATIVE_ARRAY_BUFFER_VIEWS$1) for (NAME in TypedArrayConstructorsList) {
      if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME].prototype, TypedArrayPrototype$1);
    }
  }

  // WebKit bug - one more object in Uint8ClampedArray prototype chain
  if (NATIVE_ARRAY_BUFFER_VIEWS$1 && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$1) {
    objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype$1);
  }

  if (descriptors && !hasOwnProperty_1(TypedArrayPrototype$1, TO_STRING_TAG)) {
    TYPED_ARRAY_TAG_REQUIRED = true;
    defineProperty$1(TypedArrayPrototype$1, TO_STRING_TAG, { get: function () {
      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
    } });
    for (NAME in TypedArrayConstructorsList) if (global_1[NAME]) {
      createNonEnumerableProperty(global_1[NAME], TYPED_ARRAY_TAG, NAME);
    }
  }

  var arrayBufferViewCore = {
    NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$1,
    TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR$1,
    TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
    aTypedArray: aTypedArray$m,
    aTypedArrayConstructor: aTypedArrayConstructor$2,
    exportTypedArrayMethod: exportTypedArrayMethod$n,
    exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
    isView: isView,
    isTypedArray: isTypedArray,
    TypedArray: TypedArray,
    TypedArrayPrototype: TypedArrayPrototype$1
  };

  /* eslint-disable no-new -- required for testing */



  var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

  var ArrayBuffer$1 = global_1.ArrayBuffer;
  var Int8Array$3 = global_1.Int8Array;

  var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
    Int8Array$3(1);
  }) || !fails(function () {
    new Int8Array$3(-1);
  }) || !checkCorrectnessOfIteration(function (iterable) {
    new Int8Array$3();
    new Int8Array$3(null);
    new Int8Array$3(1.5);
    new Int8Array$3(iterable);
  }, true) || fails(function () {
    // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
    return new Int8Array$3(new ArrayBuffer$1(2), 1, undefined).length !== 1;
  });

  var redefineAll = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
  };

  var TypeError$4 = global_1.TypeError;

  var anInstance = function (it, Prototype) {
    if (objectIsPrototypeOf(Prototype, it)) return it;
    throw TypeError$4('Incorrect invocation');
  };

  var RangeError$5 = global_1.RangeError;

  // `ToIndex` abstract operation
  // https://tc39.es/ecma262/#sec-toindex
  var toIndex = function (it) {
    if (it === undefined) return 0;
    var number = toIntegerOrInfinity(it);
    var length = toLength(number);
    if (number !== length) throw RangeError$5('Wrong length or index');
    return length;
  };

  // IEEE754 conversions based on https://github.com/feross/ieee754


  var Array$5 = global_1.Array;
  var abs = Math.abs;
  var pow = Math.pow;
  var floor$3 = Math.floor;
  var log = Math.log;
  var LN2 = Math.LN2;

  var pack = function (number, mantissaLength, bytes) {
    var buffer = Array$5(bytes);
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
    var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
    var index = 0;
    var exponent, mantissa, c;
    number = abs(number);
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number || number === Infinity) {
      // eslint-disable-next-line no-self-compare -- NaN check
      mantissa = number != number ? 1 : 0;
      exponent = eMax;
    } else {
      exponent = floor$3(log(number) / LN2);
      c = pow(2, -exponent);
      if (number * c < 1) {
        exponent--;
        c *= 2;
      }
      if (exponent + eBias >= 1) {
        number += rt / c;
      } else {
        number += rt * pow(2, 1 - eBias);
      }
      if (number * c >= 2) {
        exponent++;
        c /= 2;
      }
      if (exponent + eBias >= eMax) {
        mantissa = 0;
        exponent = eMax;
      } else if (exponent + eBias >= 1) {
        mantissa = (number * c - 1) * pow(2, mantissaLength);
        exponent = exponent + eBias;
      } else {
        mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
        exponent = 0;
      }
    }
    while (mantissaLength >= 8) {
      buffer[index++] = mantissa & 255;
      mantissa /= 256;
      mantissaLength -= 8;
    }
    exponent = exponent << mantissaLength | mantissa;
    exponentLength += mantissaLength;
    while (exponentLength > 0) {
      buffer[index++] = exponent & 255;
      exponent /= 256;
      exponentLength -= 8;
    }
    buffer[--index] |= sign * 128;
    return buffer;
  };

  var unpack = function (buffer, mantissaLength) {
    var bytes = buffer.length;
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var nBits = exponentLength - 7;
    var index = bytes - 1;
    var sign = buffer[index--];
    var exponent = sign & 127;
    var mantissa;
    sign >>= 7;
    while (nBits > 0) {
      exponent = exponent * 256 + buffer[index--];
      nBits -= 8;
    }
    mantissa = exponent & (1 << -nBits) - 1;
    exponent >>= -nBits;
    nBits += mantissaLength;
    while (nBits > 0) {
      mantissa = mantissa * 256 + buffer[index--];
      nBits -= 8;
    }
    if (exponent === 0) {
      exponent = 1 - eBias;
    } else if (exponent === eMax) {
      return mantissa ? NaN : sign ? -Infinity : Infinity;
    } else {
      mantissa = mantissa + pow(2, mantissaLength);
      exponent = exponent - eBias;
    } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
  };

  var ieee754 = {
    pack: pack,
    unpack: unpack
  };

  // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  var arrayFill = function fill(value /* , start = 0, end = @length */) {
    var O = toObject(this);
    var length = lengthOfArrayLike(O);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var Array$4 = global_1.Array;
  var max$1 = Math.max;

  var arraySliceSimple = function (O, start, end) {
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = Array$4(max$1(fin - k, 0));
    for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  };

  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var defineProperty = objectDefineProperty.f;





  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
  var getInternalState = internalState.get;
  var setInternalState = internalState.set;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var DATA_VIEW = 'DataView';
  var PROTOTYPE = 'prototype';
  var WRONG_LENGTH = 'Wrong length';
  var WRONG_INDEX = 'Wrong index';
  var NativeArrayBuffer = global_1[ARRAY_BUFFER];
  var $ArrayBuffer = NativeArrayBuffer;
  var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
  var $DataView = global_1[DATA_VIEW];
  var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
  var ObjectPrototype = Object.prototype;
  var Array$3 = global_1.Array;
  var RangeError$4 = global_1.RangeError;
  var fill = functionUncurryThis(arrayFill);
  var reverse = functionUncurryThis([].reverse);

  var packIEEE754 = ieee754.pack;
  var unpackIEEE754 = ieee754.unpack;

  var packInt8 = function (number) {
    return [number & 0xFF];
  };

  var packInt16 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF];
  };

  var packInt32 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
  };

  var unpackInt32 = function (buffer) {
    return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
  };

  var packFloat32 = function (number) {
    return packIEEE754(number, 23, 4);
  };

  var packFloat64 = function (number) {
    return packIEEE754(number, 52, 8);
  };

  var addGetter = function (Constructor, key) {
    defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
  };

  var get = function (view, count, index, isLittleEndian) {
    var intIndex = toIndex(index);
    var store = getInternalState(view);
    if (intIndex + count > store.byteLength) throw RangeError$4(WRONG_INDEX);
    var bytes = getInternalState(store.buffer).bytes;
    var start = intIndex + store.byteOffset;
    var pack = arraySliceSimple(bytes, start, start + count);
    return isLittleEndian ? pack : reverse(pack);
  };

  var set = function (view, count, index, conversion, value, isLittleEndian) {
    var intIndex = toIndex(index);
    var store = getInternalState(view);
    if (intIndex + count > store.byteLength) throw RangeError$4(WRONG_INDEX);
    var bytes = getInternalState(store.buffer).bytes;
    var start = intIndex + store.byteOffset;
    var pack = conversion(+value);
    for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
  };

  if (!arrayBufferNative) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, ArrayBufferPrototype);
      var byteLength = toIndex(length);
      setInternalState(this, {
        bytes: fill(Array$3(byteLength), 0),
        byteLength: byteLength
      });
      if (!descriptors) this.byteLength = byteLength;
    };

    ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE];

    $DataView = function DataView(buffer, byteOffset, byteLength) {
      anInstance(this, DataViewPrototype);
      anInstance(buffer, ArrayBufferPrototype);
      var bufferLength = getInternalState(buffer).byteLength;
      var offset = toIntegerOrInfinity(byteOffset);
      if (offset < 0 || offset > bufferLength) throw RangeError$4('Wrong offset');
      byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
      if (offset + byteLength > bufferLength) throw RangeError$4(WRONG_LENGTH);
      setInternalState(this, {
        buffer: buffer,
        byteLength: byteLength,
        byteOffset: offset
      });
      if (!descriptors) {
        this.buffer = buffer;
        this.byteLength = byteLength;
        this.byteOffset = offset;
      }
    };

    DataViewPrototype = $DataView[PROTOTYPE];

    if (descriptors) {
      addGetter($ArrayBuffer, 'byteLength');
      addGetter($DataView, 'buffer');
      addGetter($DataView, 'byteLength');
      addGetter($DataView, 'byteOffset');
    }

    redefineAll(DataViewPrototype, {
      getInt8: function getInt8(byteOffset) {
        return get(this, 1, byteOffset)[0] << 24 >> 24;
      },
      getUint8: function getUint8(byteOffset) {
        return get(this, 1, byteOffset)[0];
      },
      getInt16: function getInt16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
      },
      getUint16: function getUint16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
        return bytes[1] << 8 | bytes[0];
      },
      getInt32: function getInt32(byteOffset /* , littleEndian */) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
      },
      getUint32: function getUint32(byteOffset /* , littleEndian */) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
      },
      getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
      },
      getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
      },
      setInt8: function setInt8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      },
      setUint8: function setUint8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      },
      setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
        set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
      }
    });
  } else {
    var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
    /* eslint-disable no-new -- required for testing */
    if (!fails(function () {
      NativeArrayBuffer(1);
    }) || !fails(function () {
      new NativeArrayBuffer(-1);
    }) || fails(function () {
      new NativeArrayBuffer();
      new NativeArrayBuffer(1.5);
      new NativeArrayBuffer(NaN);
      return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
    })) {
    /* eslint-enable no-new -- required for testing */
      $ArrayBuffer = function ArrayBuffer(length) {
        anInstance(this, ArrayBufferPrototype);
        return new NativeArrayBuffer(toIndex(length));
      };

      $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype;

      for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
        if (!((key = keys[j++]) in $ArrayBuffer)) {
          createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
        }
      }

      ArrayBufferPrototype.constructor = $ArrayBuffer;
    } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
    }

    // WebKit bug - the same parent prototype for typed arrays and data view
    if (objectSetPrototypeOf && objectGetPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
      objectSetPrototypeOf(DataViewPrototype, ObjectPrototype);
    }

    // iOS Safari 7.x bug
    var testView = new $DataView(new $ArrayBuffer(2));
    var $setInt8 = functionUncurryThis(DataViewPrototype.setInt8);
    testView.setInt8(0, 2147483648);
    testView.setInt8(1, 2147483649);
    if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll(DataViewPrototype, {
      setInt8: function setInt8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      },
      setUint8: function setUint8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      }
    }, { unsafe: true });
  }

  setToStringTag($ArrayBuffer, ARRAY_BUFFER);
  setToStringTag($DataView, DATA_VIEW);

  var arrayBuffer = {
    ArrayBuffer: $ArrayBuffer,
    DataView: $DataView
  };

  var floor$2 = Math.floor;

  // `IsIntegralNumber` abstract operation
  // https://tc39.es/ecma262/#sec-isintegralnumber
  // eslint-disable-next-line es-x/no-number-isinteger -- safe
  var isIntegralNumber = Number.isInteger || function isInteger(it) {
    return !isObject(it) && isFinite(it) && floor$2(it) === it;
  };

  var RangeError$3 = global_1.RangeError;

  var toPositiveInteger = function (it) {
    var result = toIntegerOrInfinity(it);
    if (result < 0) throw RangeError$3("The argument can't be less than 0");
    return result;
  };

  var RangeError$2 = global_1.RangeError;

  var toOffset = function (it, BYTES) {
    var offset = toPositiveInteger(it);
    if (offset % BYTES) throw RangeError$2('Wrong offset');
    return offset;
  };

  var bind = functionUncurryThis(functionUncurryThis.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined ? fn : functionBindNative ? bind(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = functionUncurryThis(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    switch (classof(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor = !construct || fails(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var TypeError$3 = global_1.TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor = function (argument) {
    if (isConstructor(argument)) return argument;
    throw TypeError$3(tryToString(argument) + ' is not a constructor');
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return getMethod(it, ITERATOR$2)
      || getMethod(it, '@@iterator')
      || iterators[classof(it)];
  };

  var TypeError$2 = global_1.TypeError;

  var getIterator = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject(functionCall(iteratorMethod, argument));
    throw TypeError$2(tryToString(argument) + ' is not iterable');
  };

  var ITERATOR$1 = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$1] === it);
  };

  var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;

  var typedArrayFrom = function from(source /* , mapfn, thisArg */) {
    var C = aConstructor(this);
    var O = toObject(source);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var i, length, result, step, iterator, next;
    if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      O = [];
      while (!(step = functionCall(next, iterator)).done) {
        O.push(step.value);
      }
    }
    if (mapping && argumentsLength > 2) {
      mapfn = functionBindContext(mapfn, arguments[2]);
    }
    length = lengthOfArrayLike(O);
    result = new (aTypedArrayConstructor$1(C))(length);
    for (i = 0; length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es-x/no-array-isarray -- safe
  var isArray = Array.isArray || function isArray(argument) {
    return classofRaw(argument) == 'Array';
  };

  var SPECIES$4 = wellKnownSymbol('species');
  var Array$2 = global_1.Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor = function (originalArray) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor(C) && (C === Array$2 || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES$4];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array$2 : C;
  };

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var push = functionUncurryThis([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that);
      var length = lengthOfArrayLike(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$1(7)
  };

  var SPECIES$3 = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES$3]) {
      defineProperty(Constructor, SPECIES$3, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var typedArrayConstructor = createCommonjsModule(function (module) {






















  var getOwnPropertyNames = objectGetOwnPropertyNames.f;

  var forEach = arrayIteration.forEach;






  var getInternalState = internalState.get;
  var setInternalState = internalState.set;
  var nativeDefineProperty = objectDefineProperty.f;
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var round = Math.round;
  var RangeError = global_1.RangeError;
  var ArrayBuffer = arrayBuffer.ArrayBuffer;
  var ArrayBufferPrototype = ArrayBuffer.prototype;
  var DataView = arrayBuffer.DataView;
  var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
  var TYPED_ARRAY_CONSTRUCTOR = arrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
  var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
  var TypedArray = arrayBufferViewCore.TypedArray;
  var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
  var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
  var isTypedArray = arrayBufferViewCore.isTypedArray;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var WRONG_LENGTH = 'Wrong length';

  var fromList = function (C, list) {
    aTypedArrayConstructor(C);
    var index = 0;
    var length = list.length;
    var result = new C(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key) {
    nativeDefineProperty(it, key, { get: function () {
      return getInternalState(this)[key];
    } });
  };

  var isArrayBuffer = function (it) {
    var klass;
    return objectIsPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
  };

  var isTypedArrayIndex = function (target, key) {
    return isTypedArray(target)
      && !isSymbol(key)
      && key in target
      && isIntegralNumber(+key)
      && key >= 0;
  };

  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
    key = toPropertyKey(key);
    return isTypedArrayIndex(target, key)
      ? createPropertyDescriptor(2, target[key])
      : nativeGetOwnPropertyDescriptor(target, key);
  };

  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
    key = toPropertyKey(key);
    if (isTypedArrayIndex(target, key)
      && isObject(descriptor)
      && hasOwnProperty_1(descriptor, 'value')
      && !hasOwnProperty_1(descriptor, 'get')
      && !hasOwnProperty_1(descriptor, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !descriptor.configurable
      && (!hasOwnProperty_1(descriptor, 'writable') || descriptor.writable)
      && (!hasOwnProperty_1(descriptor, 'enumerable') || descriptor.enumerable)
    ) {
      target[key] = descriptor.value;
      return target;
    } return nativeDefineProperty(target, key, descriptor);
  };

  if (descriptors) {
    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
      objectDefineProperty.f = wrappedDefineProperty;
      addGetter(TypedArrayPrototype, 'buffer');
      addGetter(TypedArrayPrototype, 'byteOffset');
      addGetter(TypedArrayPrototype, 'byteLength');
      addGetter(TypedArrayPrototype, 'length');
    }

    _export({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
      getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
      defineProperty: wrappedDefineProperty
    });

    module.exports = function (TYPE, wrapper, CLAMPED) {
      var BYTES = TYPE.match(/\d+$/)[0] / 8;
      var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
      var GETTER = 'get' + TYPE;
      var SETTER = 'set' + TYPE;
      var NativeTypedArrayConstructor = global_1[CONSTRUCTOR_NAME];
      var TypedArrayConstructor = NativeTypedArrayConstructor;
      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
      var exported = {};

      var getter = function (that, index) {
        var data = getInternalState(that);
        return data.view[GETTER](index * BYTES + data.byteOffset, true);
      };

      var setter = function (that, index, value) {
        var data = getInternalState(that);
        if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
        data.view[SETTER](index * BYTES + data.byteOffset, value, true);
      };

      var addElement = function (that, index) {
        nativeDefineProperty(that, index, {
          get: function () {
            return getter(this, index);
          },
          set: function (value) {
            return setter(this, index, value);
          },
          enumerable: true
        });
      };

      if (!NATIVE_ARRAY_BUFFER_VIEWS) {
        TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
          anInstance(that, TypedArrayConstructorPrototype);
          var index = 0;
          var byteOffset = 0;
          var buffer, byteLength, length;
          if (!isObject(data)) {
            length = toIndex(data);
            byteLength = length * BYTES;
            buffer = new ArrayBuffer(byteLength);
          } else if (isArrayBuffer(data)) {
            buffer = data;
            byteOffset = toOffset(offset, BYTES);
            var $len = data.byteLength;
            if ($length === undefined) {
              if ($len % BYTES) throw RangeError(WRONG_LENGTH);
              byteLength = $len - byteOffset;
              if (byteLength < 0) throw RangeError(WRONG_LENGTH);
            } else {
              byteLength = toLength($length) * BYTES;
              if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
            }
            length = byteLength / BYTES;
          } else if (isTypedArray(data)) {
            return fromList(TypedArrayConstructor, data);
          } else {
            return functionCall(typedArrayFrom, TypedArrayConstructor, data);
          }
          setInternalState(that, {
            buffer: buffer,
            byteOffset: byteOffset,
            byteLength: byteLength,
            length: length,
            view: new DataView(buffer)
          });
          while (index < length) addElement(that, index++);
        });

        if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
      } else if (typedArrayConstructorsRequireWrappers) {
        TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
          anInstance(dummy, TypedArrayConstructorPrototype);
          return inheritIfRequired(function () {
            if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
            if (isArrayBuffer(data)) return $length !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
              : typedArrayOffset !== undefined
                ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
                : new NativeTypedArrayConstructor(data);
            if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
            return functionCall(typedArrayFrom, TypedArrayConstructor, data);
          }(), dummy, TypedArrayConstructor);
        });

        if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
        forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
          if (!(key in TypedArrayConstructor)) {
            createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
          }
        });
        TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
      }

      if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
        createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
      }

      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR, TypedArrayConstructor);

      if (TYPED_ARRAY_TAG) {
        createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
      }

      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

      _export({
        global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
      }, exported);

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
        createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
      }

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
        createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
      }

      setSpecies(CONSTRUCTOR_NAME);
    };
  } else module.exports = function () { /* empty */ };
  });

  // `Uint8Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  typedArrayConstructor('Uint8', function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var min$1 = Math.min;

  // `Array.prototype.copyWithin` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.copywithin
  // eslint-disable-next-line es-x/no-array-prototype-copywithin -- safe
  var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var to = toAbsoluteIndex(target, len);
    var from = toAbsoluteIndex(start, len);
    var end = arguments.length > 2 ? arguments[2] : undefined;
    var count = min$1((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
    var inc = 1;
    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }
    while (count-- > 0) {
      if (from in O) O[to] = O[from];
      else delete O[to];
      to += inc;
      from += inc;
    } return O;
  };

  var u$ArrayCopyWithin = functionUncurryThis(arrayCopyWithin);
  var aTypedArray$l = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$m = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.copyWithin` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
  exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start /* , end */) {
    return u$ArrayCopyWithin(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
  });

  var $every = arrayIteration.every;

  var aTypedArray$k = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$l = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.every` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
  exportTypedArrayMethod$l('every', function every(callbackfn /* , thisArg */) {
    return $every(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var aTypedArray$j = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$k = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.fill` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
  exportTypedArrayMethod$k('fill', function fill(value /* , start, end */) {
    var length = arguments.length;
    return functionCall(
      arrayFill,
      aTypedArray$j(this),
      value,
      length > 1 ? arguments[1] : undefined,
      length > 2 ? arguments[2] : undefined
    );
  });

  var arrayFromConstructorAndList = function (Constructor, list) {
    var index = 0;
    var length = lengthOfArrayLike(list);
    var result = new Constructor(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var SPECIES$2 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$2]) == undefined ? defaultConstructor : aConstructor(S);
  };

  var TYPED_ARRAY_CONSTRUCTOR = arrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
  var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;

  // a part of `TypedArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#typedarray-species-create
  var typedArraySpeciesConstructor = function (originalArray) {
    return aTypedArrayConstructor(speciesConstructor(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
  };

  var typedArrayFromSpeciesAndList = function (instance, list) {
    return arrayFromConstructorAndList(typedArraySpeciesConstructor(instance), list);
  };

  var $filter = arrayIteration.filter;


  var aTypedArray$i = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$j = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.filter` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
  exportTypedArrayMethod$j('filter', function filter(callbackfn /* , thisArg */) {
    var list = $filter(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return typedArrayFromSpeciesAndList(this, list);
  });

  var $find$1 = arrayIteration.find;

  var aTypedArray$h = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.find` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
  exportTypedArrayMethod$i('find', function find(predicate /* , thisArg */) {
    return $find$1(aTypedArray$h(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var $findIndex = arrayIteration.findIndex;

  var aTypedArray$g = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$h = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
  exportTypedArrayMethod$h('findIndex', function findIndex(predicate /* , thisArg */) {
    return $findIndex(aTypedArray$g(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var $forEach = arrayIteration.forEach;

  var aTypedArray$f = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$g = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
  exportTypedArrayMethod$g('forEach', function forEach(callbackfn /* , thisArg */) {
    $forEach(aTypedArray$f(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var $includes = arrayIncludes.includes;

  var aTypedArray$e = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$f = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.includes` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
  exportTypedArrayMethod$f('includes', function includes(searchElement /* , fromIndex */) {
    return $includes(aTypedArray$e(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var $indexOf = arrayIncludes.indexOf;

  var aTypedArray$d = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$e = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
  exportTypedArrayMethod$e('indexOf', function indexOf(searchElement /* , fromIndex */) {
    return $indexOf(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ITERATOR = wellKnownSymbol('iterator');
  var Uint8Array$2 = global_1.Uint8Array;
  var arrayValues = functionUncurryThis(es_array_iterator.values);
  var arrayKeys = functionUncurryThis(es_array_iterator.keys);
  var arrayEntries = functionUncurryThis(es_array_iterator.entries);
  var aTypedArray$c = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$d = arrayBufferViewCore.exportTypedArrayMethod;
  var TypedArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype;

  var GENERIC = !fails(function () {
    TypedArrayPrototype[ITERATOR].call([1]);
  });

  var ITERATOR_IS_VALUES = !!TypedArrayPrototype
    && TypedArrayPrototype.values
    && TypedArrayPrototype[ITERATOR] === TypedArrayPrototype.values
    && TypedArrayPrototype.values.name === 'values';

  var typedArrayValues = function values() {
    return arrayValues(aTypedArray$c(this));
  };

  // `%TypedArray%.prototype.entries` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
  exportTypedArrayMethod$d('entries', function entries() {
    return arrayEntries(aTypedArray$c(this));
  }, GENERIC);
  // `%TypedArray%.prototype.keys` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
  exportTypedArrayMethod$d('keys', function keys() {
    return arrayKeys(aTypedArray$c(this));
  }, GENERIC);
  // `%TypedArray%.prototype.values` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
  exportTypedArrayMethod$d('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });
  // `%TypedArray%.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
  exportTypedArrayMethod$d(ITERATOR, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });

  var aTypedArray$b = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$c = arrayBufferViewCore.exportTypedArrayMethod;
  var $join = functionUncurryThis([].join);

  // `%TypedArray%.prototype.join` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
  exportTypedArrayMethod$c('join', function join(separator) {
    return $join(aTypedArray$b(this), separator);
  });

  var FunctionPrototype = Function.prototype;
  var apply = FunctionPrototype.apply;
  var call = FunctionPrototype.call;

  // eslint-disable-next-line es-x/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (functionBindNative ? call.bind(apply) : function () {
    return call.apply(apply, arguments);
  });

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () { return 1; }, 1);
    });
  };

  /* eslint-disable es-x/no-array-prototype-lastindexof -- safe */






  var min = Math.min;
  var $lastIndexOf = [].lastIndexOf;
  var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
  var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
  var FORCED$2 = NEGATIVE_ZERO || !STRICT_METHOD;

  // `Array.prototype.lastIndexOf` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.lastindexof
  var arrayLastIndexOf = FORCED$2 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return functionApply($lastIndexOf, this, arguments) || 0;
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var index = length - 1;
    if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
    return -1;
  } : $lastIndexOf;

  var aTypedArray$a = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$b = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.lastIndexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
  exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
    var length = arguments.length;
    return functionApply(arrayLastIndexOf, aTypedArray$a(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
  });

  var $map$1 = arrayIteration.map;


  var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.map` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
  exportTypedArrayMethod$a('map', function map(mapfn /* , thisArg */) {
    return $map$1(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
      return new (typedArraySpeciesConstructor(O))(length);
    });
  });

  var TypeError$1 = global_1.TypeError;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aCallable(callbackfn);
      var O = toObject(that);
      var self = indexedObject(O);
      var length = lengthOfArrayLike(O);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw TypeError$1('Reduce of empty array with no initial value');
        }
      }
      for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod(true)
  };

  var $reduce = arrayReduce.left;

  var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
  exportTypedArrayMethod$9('reduce', function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(aTypedArray$8(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var $reduceRight = arrayReduce.right;

  var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduceRicht` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
  exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduceRight(aTypedArray$7(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod;
  var floor$1 = Math.floor;

  // `%TypedArray%.prototype.reverse` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
  exportTypedArrayMethod$7('reverse', function reverse() {
    var that = this;
    var length = aTypedArray$6(that).length;
    var middle = floor$1(length / 2);
    var index = 0;
    var value;
    while (index < middle) {
      value = that[index];
      that[index++] = that[--length];
      that[length] = value;
    } return that;
  });

  var RangeError$1 = global_1.RangeError;
  var Int8Array$2 = global_1.Int8Array;
  var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
  var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
  var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod;

  var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails(function () {
    // eslint-disable-next-line es-x/no-typed-arrays -- required for testing
    var array = new Uint8ClampedArray(2);
    functionCall($set, array, { length: 1, 0: 3 }, 1);
    return array[1] !== 3;
  });

  // https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
  var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
    var array = new Int8Array$2(2);
    array.set(1);
    array.set('2', 1);
    return array[0] !== 0 || array[1] !== 2;
  });

  // `%TypedArray%.prototype.set` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
  exportTypedArrayMethod$6('set', function set(arrayLike /* , offset */) {
    aTypedArray$5(this);
    var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
    var src = toObject(arrayLike);
    if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return functionCall($set, this, src, offset);
    var length = this.length;
    var len = lengthOfArrayLike(src);
    var index = 0;
    if (len + offset > length) throw RangeError$1('Wrong length');
    while (index < len) this[offset + index] = src[index++];
  }, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

  var arraySlice = functionUncurryThis([].slice);

  var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod;

  var FORCED$1 = fails(function () {
    // eslint-disable-next-line es-x/no-typed-arrays -- required for testing
    new Int8Array(1).slice();
  });

  // `%TypedArray%.prototype.slice` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
  exportTypedArrayMethod$5('slice', function slice(start, end) {
    var list = arraySlice(aTypedArray$4(this), start, end);
    var C = typedArraySpeciesConstructor(this);
    var index = 0;
    var length = list.length;
    var result = new C(length);
    while (length > index) result[index] = list[index++];
    return result;
  }, FORCED$1);

  var $some = arrayIteration.some;

  var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.some` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
  exportTypedArrayMethod$4('some', function some(callbackfn /* , thisArg */) {
    return $some(aTypedArray$3(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var floor = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(
      array,
      mergeSort(arraySliceSimple(array, 0, middle), comparefn),
      mergeSort(arraySliceSimple(array, middle), comparefn),
      comparefn
    );
  };

  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    } return array;
  };

  var merge = function (array, left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    } return array;
  };

  var arraySort = mergeSort;

  var firefox = engineUserAgent.match(/firefox\/(\d+)/i);

  var engineFfVersion = !!firefox && +firefox[1];

  var engineIsIeOrEdge = /MSIE|Trident/.test(engineUserAgent);

  var webkit = engineUserAgent.match(/AppleWebKit\/(\d+)\./);

  var engineWebkitVersion = !!webkit && +webkit[1];

  var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod;
  var Uint16Array$1 = global_1.Uint16Array;
  var un$Sort = Uint16Array$1 && functionUncurryThis(Uint16Array$1.prototype.sort);

  // WebKit
  var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails(function () {
    un$Sort(new Uint16Array$1(2), null);
  }) && fails(function () {
    un$Sort(new Uint16Array$1(2), {});
  }));

  var STABLE_SORT = !!un$Sort && !fails(function () {
    // feature detection can be too slow, so check engines versions
    if (engineV8Version) return engineV8Version < 74;
    if (engineFfVersion) return engineFfVersion < 67;
    if (engineIsIeOrEdge) return true;
    if (engineWebkitVersion) return engineWebkitVersion < 602;

    var array = new Uint16Array$1(516);
    var expected = Array(516);
    var index, mod;

    for (index = 0; index < 516; index++) {
      mod = index % 4;
      array[index] = 515 - index;
      expected[index] = index - 2 * mod + 3;
    }

    un$Sort(array, function (a, b) {
      return (a / 4 | 0) - (b / 4 | 0);
    });

    for (index = 0; index < 516; index++) {
      if (array[index] !== expected[index]) return true;
    }
  });

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (y !== y) return -1;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (x !== x) return 1;
      if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
      return x > y;
    };
  };

  // `%TypedArray%.prototype.sort` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
  exportTypedArrayMethod$3('sort', function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);
    if (STABLE_SORT) return un$Sort(this, comparefn);

    return arraySort(aTypedArray$2(this), getSortCompare(comparefn));
  }, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

  var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.subarray` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
  exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
    var O = aTypedArray$1(this);
    var length = O.length;
    var beginIndex = toAbsoluteIndex(begin, length);
    var C = typedArraySpeciesConstructor(O);
    return new C(
      O.buffer,
      O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
      toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
    );
  });

  var Int8Array$1 = global_1.Int8Array;
  var aTypedArray = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;
  var $toLocaleString = [].toLocaleString;

  // iOS Safari 6.x fails here
  var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails(function () {
    $toLocaleString.call(new Int8Array$1(1));
  });

  var FORCED = fails(function () {
    return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
  }) || !fails(function () {
    Int8Array$1.prototype.toLocaleString.call([1, 2]);
  });

  // `%TypedArray%.prototype.toLocaleString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
  exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
    return functionApply(
      $toLocaleString,
      TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray(this)) : aTypedArray(this),
      arraySlice(arguments)
    );
  }, FORCED);

  var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;




  var Uint8Array$1 = global_1.Uint8Array;
  var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
  var arrayToString = [].toString;
  var join = functionUncurryThis([].join);

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = function toString() {
      return join(this);
    };
  }

  var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

  // `%TypedArray%.prototype.toString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
  exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

  var SPECIES$1 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $map = arrayIteration.map;


  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  var SPECIES = wellKnownSymbol('species');
  var Array$1 = global_1.Array;
  var max = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = lengthOfArrayLike(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor(Constructor) && (Constructor === Array$1 || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array$1 || Constructor === undefined) {
          return arraySlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array$1 : Constructor)(max(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var $find = arrayIteration.find;


  var FIND = 'find';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  (function(l){function m(){}function k(a,c){a=void 0===a?"utf-8":a;c=void 0===c?{fatal:!1}:c;if(-1===r.indexOf(a.toLowerCase()))throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('"+a+"') is invalid.");if(c.fatal)throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");}function t(a){return Buffer.from(a.buffer,a.byteOffset,a.byteLength).toString("utf-8")}function u(a){var c=URL.createObjectURL(new Blob([a],{type:"text/plain;charset=UTF-8"}));
  try{var f=new XMLHttpRequest;f.open("GET",c,!1);f.send();return f.responseText}catch(e){return q(a)}finally{URL.revokeObjectURL(c);}}function q(a){for(var c=0,f=Math.min(65536,a.length+1),e=new Uint16Array(f),h=[],d=0;;){var b=c<a.length;if(!b||d>=f-1){h.push(String.fromCharCode.apply(null,e.subarray(0,d)));if(!b)return h.join("");a=a.subarray(c);d=c=0;}b=a[c++];if(0===(b&128))e[d++]=b;else if(192===(b&224)){var g=a[c++]&63;e[d++]=(b&31)<<6|g;}else if(224===(b&240)){g=a[c++]&63;var n=a[c++]&63;e[d++]=
  (b&31)<<12|g<<6|n;}else if(240===(b&248)){g=a[c++]&63;n=a[c++]&63;var v=a[c++]&63;b=(b&7)<<18|g<<12|n<<6|v;65535<b&&(b-=65536,e[d++]=b>>>10&1023|55296,b=56320|b&1023);e[d++]=b;}}}if(l.TextEncoder&&l.TextDecoder)return !1;var r=["utf-8","utf8","unicode-1-1-utf-8"];Object.defineProperty(m.prototype,"encoding",{value:"utf-8"});m.prototype.encode=function(a,c){c=void 0===c?{stream:!1}:c;if(c.stream)throw Error("Failed to encode: the 'stream' option is unsupported.");c=0;for(var f=a.length,e=0,h=Math.max(32,
  f+(f>>>1)+7),d=new Uint8Array(h>>>3<<3);c<f;){var b=a.charCodeAt(c++);if(55296<=b&&56319>=b){if(c<f){var g=a.charCodeAt(c);56320===(g&64512)&&(++c,b=((b&1023)<<10)+(g&1023)+65536);}if(55296<=b&&56319>=b)continue}e+4>d.length&&(h+=8,h*=1+c/a.length*2,h=h>>>3<<3,g=new Uint8Array(h),g.set(d),d=g);if(0===(b&4294967168))d[e++]=b;else {if(0===(b&4294965248))d[e++]=b>>>6&31|192;else if(0===(b&4294901760))d[e++]=b>>>12&15|224,d[e++]=b>>>6&63|128;else if(0===(b&4292870144))d[e++]=b>>>18&7|240,d[e++]=b>>>12&
  63|128,d[e++]=b>>>6&63|128;else continue;d[e++]=b&63|128;}}return d.slice?d.slice(0,e):d.subarray(0,e)};Object.defineProperty(k.prototype,"encoding",{value:"utf-8"});Object.defineProperty(k.prototype,"fatal",{value:!1});Object.defineProperty(k.prototype,"ignoreBOM",{value:!1});var p=q;"function"===typeof Buffer&&Buffer.from?p=t:"function"===typeof Blob&&"function"===typeof URL&&"function"===typeof URL.createObjectURL&&(p=u);k.prototype.decode=function(a,c){c=void 0===c?{stream:!1}:c;if(c.stream)throw Error("Failed to decode: the 'stream' option is unsupported.");
  a=a instanceof Uint8Array?a:a.buffer instanceof ArrayBuffer?new Uint8Array(a.buffer):new Uint8Array(a);return p(a)};l.TextEncoder=m;l.TextDecoder=k;})("undefined"!==typeof window?window:"undefined"!==typeof commonjsGlobal?commonjsGlobal:commonjsGlobal);

  var BREAK_TYPES = {
    grapheme: 0,
    word: 1,
    sentence: 3
  };

  var getSegmentType = function getSegmentType(type) {
    if (type < 100) {
      return 'none';
    } else if (type >= 100 && type < 200) {
      return 'number';
    } else if (type >= 200 && type < 300) {
      return 'word';
    } else if (type >= 300 && type < 400) {
      return 'kana';
    } else if (type >= 400 && type < 500) {
      return 'ideo';
    }
  };

  var createIntlSegmenterPolyfillFromInstance = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(wasmInstance, values) {
      var allocStr;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              allocStr = function allocStr(str) {
                var encoder = new TextEncoder();
                var view = encoder.encode(str + '\0'); // typescript does not play well with webassembly
                // eslint-disable-next-line @typescript-eslint/no-explicit-any

                var exports = wasmInstance.exports;
                var ptr = exports.malloc(view.length);
                var memory = new Uint8Array(exports.memory.buffer, ptr, view.length);
                memory.set(view);
                return [ptr, view];
              };

              return _context.abrupt("return", /*#__PURE__*/function () {
                function Segmenter(locale, options) {
                  _classCallCheck(this, Segmenter);

                  this.locale = locale;
                  this.options = options || {};
                }

                _createClass(Segmenter, [{
                  key: "segment",
                  value: function segment(input) {
                    var locale = this.locale;
                    var granularity = this.options.granularity || 'grapheme';
                    var exports = wasmInstance.exports;
                    values.current = [];

                    var _allocStr = allocStr(input),
                        _allocStr2 = _slicedToArray(_allocStr, 2),
                        inputPtr = _allocStr2[0],
                        inputView = _allocStr2[1];

                    var _allocStr3 = allocStr(locale),
                        _allocStr4 = _slicedToArray(_allocStr3, 1),
                        localePtr = _allocStr4[0];

                    exports.utf8_break_iterator(BREAK_TYPES[granularity], localePtr, inputPtr, inputView.length);
                    exports.free(localePtr);
                    exports.free(inputPtr);
                    var index = 0;
                    var segments = values.current.map(function (_ref2) {
                      var _ref3 = _slicedToArray(_ref2, 3),
                          start = _ref3[0],
                          end = _ref3[1],
                          segmentType = _ref3[2];

                      var segment = input.slice(start, end);
                      var returnValue = {
                        segment: segment,
                        index: index,
                        isWordLike: granularity === 'word' ? getSegmentType(segmentType) !== 'none' : undefined,
                        breakType: granularity === 'word' ? getSegmentType(segmentType) : undefined
                      };
                      index += segment.length;
                      return returnValue;
                    });

                    segments.containing = function (indexToFind) {
                      return segments.find(function (_ref4) {
                        var index = _ref4.index,
                            segment = _ref4.segment;
                        return indexToFind >= index && indexToFind <= index + segment.length - 1;
                      });
                    };

                    return segments;
                  }
                }]);

                return Segmenter;
              }());

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function createIntlSegmenterPolyfillFromInstance(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getImports = function getImports(callback) {
    return {
      env: {
        push: function push(start, end, segmentType) {
          callback([start, end, segmentType]);
        },
        __sys_stat64: function __sys_stat64() {}
      },
      wasi_snapshot_preview1: {
        proc_exit: function proc_exit() {},
        fd_close: function fd_close() {},
        environ_sizes_get: function environ_sizes_get() {},
        environ_get: function environ_get() {}
      }
    };
  };

  var createIntlSegmenterPolyfillFromFactory = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(wasmFactory) {
      var values, _yield$wasmFactory, instance;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              values = {
                current: []
              };
              _context2.next = 3;
              return wasmFactory(getImports(function (value) {
                values.current.push(value);
              }));

            case 3:
              _yield$wasmFactory = _context2.sent;
              instance = _yield$wasmFactory.instance;
              return _context2.abrupt("return", createIntlSegmenterPolyfillFromInstance(instance, values));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function createIntlSegmenterPolyfillFromFactory(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var createIntlSegmenterPolyfill = function createIntlSegmenterPolyfill() {
    return createIntlSegmenterPolyfillFromFactory(break_iterator);
  };

  exports.createIntlSegmenterPolyfill = createIntlSegmenterPolyfill;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
