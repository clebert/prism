--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]

local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file, ...)
    if ____moduleCache[file] then
        return ____moduleCache[file].value
    end
    if ____modules[file] then
        local module = ____modules[file]
        local value = nil
        if (select("#", ...) > 0) then value = module(...) else value = module(file) end
        ____moduleCache[file] = { value = value }
        return value
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["lualib_bundle"] = function(...) 
local function __TS__ArrayAt(self, relativeIndex)
    local absoluteIndex = relativeIndex < 0 and #self + relativeIndex or relativeIndex
    if absoluteIndex >= 0 and absoluteIndex < #self then
        return self[absoluteIndex + 1]
    end
    return nil
end

local function __TS__ArrayIsArray(value)
    return type(value) == "table" and (value[1] ~= nil or next(value) == nil)
end

local function __TS__ArrayConcat(self, ...)
    local items = {...}
    local result = {}
    local len = 0
    for i = 1, #self do
        len = len + 1
        result[len] = self[i]
    end
    for i = 1, #items do
        local item = items[i]
        if __TS__ArrayIsArray(item) then
            for j = 1, #item do
                len = len + 1
                result[len] = item[j]
            end
        else
            len = len + 1
            result[len] = item
        end
    end
    return result
end

local __TS__Symbol, Symbol
do
    local symbolMetatable = {__tostring = function(self)
        return ("Symbol(" .. (self.description or "")) .. ")"
    end}
    function __TS__Symbol(description)
        return setmetatable({description = description}, symbolMetatable)
    end
    Symbol = {
        asyncDispose = __TS__Symbol("Symbol.asyncDispose"),
        dispose = __TS__Symbol("Symbol.dispose"),
        iterator = __TS__Symbol("Symbol.iterator"),
        hasInstance = __TS__Symbol("Symbol.hasInstance"),
        species = __TS__Symbol("Symbol.species"),
        toStringTag = __TS__Symbol("Symbol.toStringTag")
    }
end

local function __TS__ArrayEntries(array)
    local key = 0
    return {
        [Symbol.iterator] = function(self)
            return self
        end,
        next = function(self)
            local result = {done = array[key + 1] == nil, value = {key, array[key + 1]}}
            key = key + 1
            return result
        end
    }
end

local function __TS__ArrayEvery(self, callbackfn, thisArg)
    for i = 1, #self do
        if not callbackfn(thisArg, self[i], i - 1, self) then
            return false
        end
    end
    return true
end

local function __TS__ArrayFill(self, value, start, ____end)
    local relativeStart = start or 0
    local relativeEnd = ____end or #self
    if relativeStart < 0 then
        relativeStart = relativeStart + #self
    end
    if relativeEnd < 0 then
        relativeEnd = relativeEnd + #self
    end
    do
        local i = relativeStart
        while i < relativeEnd do
            self[i + 1] = value
            i = i + 1
        end
    end
    return self
end

local function __TS__ArrayFilter(self, callbackfn, thisArg)
    local result = {}
    local len = 0
    for i = 1, #self do
        if callbackfn(thisArg, self[i], i - 1, self) then
            len = len + 1
            result[len] = self[i]
        end
    end
    return result
end

local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
end

local function __TS__ArrayFind(self, predicate, thisArg)
    for i = 1, #self do
        local elem = self[i]
        if predicate(thisArg, elem, i - 1, self) then
            return elem
        end
    end
    return nil
end

local function __TS__ArrayFindIndex(self, callbackFn, thisArg)
    for i = 1, #self do
        if callbackFn(thisArg, self[i], i - 1, self) then
            return i - 1
        end
    end
    return -1
end

local __TS__Iterator
do
    local function iteratorGeneratorStep(self)
        local co = self.____coroutine
        local status, value = coroutine.resume(co)
        if not status then
            error(value, 0)
        end
        if coroutine.status(co) == "dead" then
            return
        end
        return true, value
    end
    local function iteratorIteratorStep(self)
        local result = self:next()
        if result.done then
            return
        end
        return true, result.value
    end
    local function iteratorStringStep(self, index)
        index = index + 1
        if index > #self then
            return
        end
        return index, string.sub(self, index, index)
    end
    function __TS__Iterator(iterable)
        if type(iterable) == "string" then
            return iteratorStringStep, iterable, 0
        elseif iterable.____coroutine ~= nil then
            return iteratorGeneratorStep, iterable
        elseif iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            return iteratorIteratorStep, iterator
        else
            return ipairs(iterable)
        end
    end
end

local __TS__ArrayFrom
do
    local function arrayLikeStep(self, index)
        index = index + 1
        if index > self.length then
            return
        end
        return index, self[index]
    end
    local function arrayLikeIterator(arr)
        if type(arr.length) == "number" then
            return arrayLikeStep, arr, 0
        end
        return __TS__Iterator(arr)
    end
    function __TS__ArrayFrom(arrayLike, mapFn, thisArg)
        local result = {}
        if mapFn == nil then
            for ____, v in arrayLikeIterator(arrayLike) do
                result[#result + 1] = v
            end
        else
            local i = 0
            for ____, v in arrayLikeIterator(arrayLike) do
                local ____mapFn_3 = mapFn
                local ____thisArg_1 = thisArg
                local ____v_2 = v
                local ____i_0 = i
                i = ____i_0 + 1
                result[#result + 1] = ____mapFn_3(____thisArg_1, ____v_2, ____i_0)
            end
        end
        return result
    end
end

local function __TS__ArrayIncludes(self, searchElement, fromIndex)
    if fromIndex == nil then
        fromIndex = 0
    end
    local len = #self
    local k = fromIndex
    if fromIndex < 0 then
        k = len + fromIndex
    end
    if k < 0 then
        k = 0
    end
    for i = k + 1, len do
        if self[i] == searchElement then
            return true
        end
    end
    return false
end

local function __TS__ArrayIndexOf(self, searchElement, fromIndex)
    if fromIndex == nil then
        fromIndex = 0
    end
    local len = #self
    if len == 0 then
        return -1
    end
    if fromIndex >= len then
        return -1
    end
    if fromIndex < 0 then
        fromIndex = len + fromIndex
        if fromIndex < 0 then
            fromIndex = 0
        end
    end
    for i = fromIndex + 1, len do
        if self[i] == searchElement then
            return i - 1
        end
    end
    return -1
end

local function __TS__ArrayJoin(self, separator)
    if separator == nil then
        separator = ","
    end
    local parts = {}
    for i = 1, #self do
        parts[i] = tostring(self[i])
    end
    return table.concat(parts, separator)
end

local function __TS__ArrayMap(self, callbackfn, thisArg)
    local result = {}
    for i = 1, #self do
        result[i] = callbackfn(thisArg, self[i], i - 1, self)
    end
    return result
end

local function __TS__ArrayPush(self, ...)
    local items = {...}
    local len = #self
    for i = 1, #items do
        len = len + 1
        self[len] = items[i]
    end
    return len
end

local function __TS__ArrayPushArray(self, items)
    local len = #self
    for i = 1, #items do
        len = len + 1
        self[len] = items[i]
    end
    return len
end

local function __TS__CountVarargs(...)
    return select("#", ...)
end

local function __TS__ArrayReduce(self, callbackFn, ...)
    local len = #self
    local k = 0
    local accumulator = nil
    if __TS__CountVarargs(...) ~= 0 then
        accumulator = ...
    elseif len > 0 then
        accumulator = self[1]
        k = 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k + 1, len do
        accumulator = callbackFn(
            nil,
            accumulator,
            self[i],
            i - 1,
            self
        )
    end
    return accumulator
end

local function __TS__ArrayReduceRight(self, callbackFn, ...)
    local len = #self
    local k = len - 1
    local accumulator = nil
    if __TS__CountVarargs(...) ~= 0 then
        accumulator = ...
    elseif len > 0 then
        accumulator = self[k + 1]
        k = k - 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k + 1, 1, -1 do
        accumulator = callbackFn(
            nil,
            accumulator,
            self[i],
            i - 1,
            self
        )
    end
    return accumulator
end

local function __TS__ArrayReverse(self)
    local i = 1
    local j = #self
    while i < j do
        local temp = self[j]
        self[j] = self[i]
        self[i] = temp
        i = i + 1
        j = j - 1
    end
    return self
end

local function __TS__ArrayUnshift(self, ...)
    local items = {...}
    local numItemsToInsert = #items
    if numItemsToInsert == 0 then
        return #self
    end
    for i = #self, 1, -1 do
        self[i + numItemsToInsert] = self[i]
    end
    for i = 1, numItemsToInsert do
        self[i] = items[i]
    end
    return #self
end

local function __TS__ArraySort(self, compareFn)
    if compareFn ~= nil then
        table.sort(
            self,
            function(a, b) return compareFn(nil, a, b) < 0 end
        )
    else
        table.sort(self)
    end
    return self
end

local function __TS__ArraySlice(self, first, last)
    local len = #self
    first = first or 0
    if first < 0 then
        first = len + first
        if first < 0 then
            first = 0
        end
    else
        if first > len then
            first = len
        end
    end
    last = last or len
    if last < 0 then
        last = len + last
        if last < 0 then
            last = 0
        end
    else
        if last > len then
            last = len
        end
    end
    local out = {}
    first = first + 1
    last = last + 1
    local n = 1
    while first < last do
        out[n] = self[first]
        first = first + 1
        n = n + 1
    end
    return out
end

local function __TS__ArraySome(self, callbackfn, thisArg)
    for i = 1, #self do
        if callbackfn(thisArg, self[i], i - 1, self) then
            return true
        end
    end
    return false
end

local function __TS__ArraySplice(self, ...)
    local args = {...}
    local len = #self
    local actualArgumentCount = __TS__CountVarargs(...)
    local start = args[1]
    local deleteCount = args[2]
    if start < 0 then
        start = len + start
        if start < 0 then
            start = 0
        end
    elseif start > len then
        start = len
    end
    local itemCount = actualArgumentCount - 2
    if itemCount < 0 then
        itemCount = 0
    end
    local actualDeleteCount
    if actualArgumentCount == 0 then
        actualDeleteCount = 0
    elseif actualArgumentCount == 1 then
        actualDeleteCount = len - start
    else
        actualDeleteCount = deleteCount or 0
        if actualDeleteCount < 0 then
            actualDeleteCount = 0
        end
        if actualDeleteCount > len - start then
            actualDeleteCount = len - start
        end
    end
    local out = {}
    for k = 1, actualDeleteCount do
        local from = start + k
        if self[from] ~= nil then
            out[k] = self[from]
        end
    end
    if itemCount < actualDeleteCount then
        for k = start + 1, len - actualDeleteCount do
            local from = k + actualDeleteCount
            local to = k + itemCount
            if self[from] then
                self[to] = self[from]
            else
                self[to] = nil
            end
        end
        for k = len - actualDeleteCount + itemCount + 1, len do
            self[k] = nil
        end
    elseif itemCount > actualDeleteCount then
        for k = len - actualDeleteCount, start + 1, -1 do
            local from = k + actualDeleteCount
            local to = k + itemCount
            if self[from] then
                self[to] = self[from]
            else
                self[to] = nil
            end
        end
    end
    local j = start + 1
    for i = 3, actualArgumentCount do
        self[j] = args[i]
        j = j + 1
    end
    for k = #self, len - actualDeleteCount + itemCount + 1, -1 do
        self[k] = nil
    end
    return out
end

local function __TS__ArrayToObject(self)
    local object = {}
    for i = 1, #self do
        object[i - 1] = self[i]
    end
    return object
end

local function __TS__ArrayFlat(self, depth)
    if depth == nil then
        depth = 1
    end
    local result = {}
    local len = 0
    for i = 1, #self do
        local value = self[i]
        if depth > 0 and __TS__ArrayIsArray(value) then
            local toAdd
            if depth == 1 then
                toAdd = value
            else
                toAdd = __TS__ArrayFlat(value, depth - 1)
            end
            for j = 1, #toAdd do
                local val = toAdd[j]
                len = len + 1
                result[len] = val
            end
        else
            len = len + 1
            result[len] = value
        end
    end
    return result
end

local function __TS__ArrayFlatMap(self, callback, thisArg)
    local result = {}
    local len = 0
    for i = 1, #self do
        local value = callback(thisArg, self[i], i - 1, self)
        if __TS__ArrayIsArray(value) then
            for j = 1, #value do
                len = len + 1
                result[len] = value[j]
            end
        else
            len = len + 1
            result[len] = value
        end
    end
    return result
end

local function __TS__ArraySetLength(self, length)
    if length < 0 or length ~= length or length == math.huge or math.floor(length) ~= length then
        error(
            "invalid array length: " .. tostring(length),
            0
        )
    end
    for i = length + 1, #self do
        self[i] = nil
    end
    return length
end

local __TS__Unpack = table.unpack or unpack

local function __TS__ArrayToReversed(self)
    local copy = {__TS__Unpack(self)}
    __TS__ArrayReverse(copy)
    return copy
end

local function __TS__ArrayToSorted(self, compareFn)
    local copy = {__TS__Unpack(self)}
    __TS__ArraySort(copy, compareFn)
    return copy
end

local function __TS__ArrayToSpliced(self, start, deleteCount, ...)
    local copy = {__TS__Unpack(self)}
    __TS__ArraySplice(copy, start, deleteCount, ...)
    return copy
end

local function __TS__ArrayWith(self, index, value)
    local copy = {__TS__Unpack(self)}
    copy[index + 1] = value
    return copy
end

local function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end

local function __TS__InstanceOf(obj, classTbl)
    if type(classTbl) ~= "table" then
        error("Right-hand side of 'instanceof' is not an object", 0)
    end
    if classTbl[Symbol.hasInstance] ~= nil then
        return not not classTbl[Symbol.hasInstance](classTbl, obj)
    end
    if type(obj) == "table" then
        local luaClass = obj.constructor
        while luaClass ~= nil do
            if luaClass == classTbl then
                return true
            end
            luaClass = luaClass.____super
        end
    end
    return false
end

local function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

local __TS__Promise
do
    local function makeDeferredPromiseFactory()
        local resolve
        local reject
        local function executor(____, res, rej)
            resolve = res
            reject = rej
        end
        return function()
            local promise = __TS__New(__TS__Promise, executor)
            return promise, resolve, reject
        end
    end
    local makeDeferredPromise = makeDeferredPromiseFactory()
    local function isPromiseLike(value)
        return __TS__InstanceOf(value, __TS__Promise)
    end
    local function doNothing(self)
    end
    local ____pcall = _G.pcall
    __TS__Promise = __TS__Class()
    __TS__Promise.name = "__TS__Promise"
    function __TS__Promise.prototype.____constructor(self, executor)
        self.state = 0
        self.fulfilledCallbacks = {}
        self.rejectedCallbacks = {}
        self.finallyCallbacks = {}
        local success, ____error = ____pcall(
            executor,
            nil,
            function(____, v) return self:resolve(v) end,
            function(____, err) return self:reject(err) end
        )
        if not success then
            self:reject(____error)
        end
    end
    function __TS__Promise.resolve(value)
        if __TS__InstanceOf(value, __TS__Promise) then
            return value
        end
        local promise = __TS__New(__TS__Promise, doNothing)
        promise.state = 1
        promise.value = value
        return promise
    end
    function __TS__Promise.reject(reason)
        local promise = __TS__New(__TS__Promise, doNothing)
        promise.state = 2
        promise.rejectionReason = reason
        return promise
    end
    __TS__Promise.prototype["then"] = function(self, onFulfilled, onRejected)
        local promise, resolve, reject = makeDeferredPromise()
        self:addCallbacks(
            onFulfilled and self:createPromiseResolvingCallback(onFulfilled, resolve, reject) or resolve,
            onRejected and self:createPromiseResolvingCallback(onRejected, resolve, reject) or reject
        )
        return promise
    end
    function __TS__Promise.prototype.addCallbacks(self, fulfilledCallback, rejectedCallback)
        if self.state == 1 then
            return fulfilledCallback(nil, self.value)
        end
        if self.state == 2 then
            return rejectedCallback(nil, self.rejectionReason)
        end
        local ____self_fulfilledCallbacks_0 = self.fulfilledCallbacks
        ____self_fulfilledCallbacks_0[#____self_fulfilledCallbacks_0 + 1] = fulfilledCallback
        local ____self_rejectedCallbacks_1 = self.rejectedCallbacks
        ____self_rejectedCallbacks_1[#____self_rejectedCallbacks_1 + 1] = rejectedCallback
    end
    function __TS__Promise.prototype.catch(self, onRejected)
        return self["then"](self, nil, onRejected)
    end
    function __TS__Promise.prototype.finally(self, onFinally)
        if onFinally then
            local ____self_finallyCallbacks_2 = self.finallyCallbacks
            ____self_finallyCallbacks_2[#____self_finallyCallbacks_2 + 1] = onFinally
            if self.state ~= 0 then
                onFinally(nil)
            end
        end
        return self
    end
    function __TS__Promise.prototype.resolve(self, value)
        if isPromiseLike(value) then
            return value:addCallbacks(
                function(____, v) return self:resolve(v) end,
                function(____, err) return self:reject(err) end
            )
        end
        if self.state == 0 then
            self.state = 1
            self.value = value
            return self:invokeCallbacks(self.fulfilledCallbacks, value)
        end
    end
    function __TS__Promise.prototype.reject(self, reason)
        if self.state == 0 then
            self.state = 2
            self.rejectionReason = reason
            return self:invokeCallbacks(self.rejectedCallbacks, reason)
        end
    end
    function __TS__Promise.prototype.invokeCallbacks(self, callbacks, value)
        local callbacksLength = #callbacks
        local finallyCallbacks = self.finallyCallbacks
        local finallyCallbacksLength = #finallyCallbacks
        if callbacksLength ~= 0 then
            for i = 1, callbacksLength - 1 do
                callbacks[i](callbacks, value)
            end
            if finallyCallbacksLength == 0 then
                return callbacks[callbacksLength](callbacks, value)
            end
            callbacks[callbacksLength](callbacks, value)
        end
        if finallyCallbacksLength ~= 0 then
            for i = 1, finallyCallbacksLength - 1 do
                finallyCallbacks[i](finallyCallbacks)
            end
            return finallyCallbacks[finallyCallbacksLength](finallyCallbacks)
        end
    end
    function __TS__Promise.prototype.createPromiseResolvingCallback(self, f, resolve, reject)
        return function(____, value)
            local success, resultOrError = ____pcall(f, nil, value)
            if not success then
                return reject(nil, resultOrError)
            end
            return self:handleCallbackValue(resultOrError, resolve, reject)
        end
    end
    function __TS__Promise.prototype.handleCallbackValue(self, value, resolve, reject)
        if isPromiseLike(value) then
            local nextpromise = value
            if nextpromise.state == 1 then
                return resolve(nil, nextpromise.value)
            elseif nextpromise.state == 2 then
                return reject(nil, nextpromise.rejectionReason)
            else
                return nextpromise:addCallbacks(resolve, reject)
            end
        else
            return resolve(nil, value)
        end
    end
end

local __TS__AsyncAwaiter, __TS__Await
do
    local ____coroutine = _G.coroutine or ({})
    local cocreate = ____coroutine.create
    local coresume = ____coroutine.resume
    local costatus = ____coroutine.status
    local coyield = ____coroutine.yield
    function __TS__AsyncAwaiter(generator)
        return __TS__New(
            __TS__Promise,
            function(____, resolve, reject)
                local fulfilled, step, resolved, asyncCoroutine
                function fulfilled(self, value)
                    local success, resultOrError = coresume(asyncCoroutine, value)
                    if success then
                        return step(resultOrError)
                    end
                    return reject(nil, resultOrError)
                end
                function step(result)
                    if resolved then
                        return
                    end
                    if costatus(asyncCoroutine) == "dead" then
                        return resolve(nil, result)
                    end
                    return __TS__Promise.resolve(result):addCallbacks(fulfilled, reject)
                end
                resolved = false
                asyncCoroutine = cocreate(generator)
                local success, resultOrError = coresume(
                    asyncCoroutine,
                    function(____, v)
                        resolved = true
                        return __TS__Promise.resolve(v):addCallbacks(resolve, reject)
                    end
                )
                if success then
                    return step(resultOrError)
                else
                    return reject(nil, resultOrError)
                end
            end
        )
    end
    function __TS__Await(thing)
        return coyield(thing)
    end
end

local function __TS__ClassExtends(target, base)
    target.____super = base
    local staticMetatable = setmetatable({__index = base}, base)
    setmetatable(target, staticMetatable)
    local baseMetatable = getmetatable(base)
    if baseMetatable then
        if type(baseMetatable.__index) == "function" then
            staticMetatable.__index = baseMetatable.__index
        end
        if type(baseMetatable.__newindex) == "function" then
            staticMetatable.__newindex = baseMetatable.__newindex
        end
    end
    setmetatable(target.prototype, base.prototype)
    if type(base.prototype.__index) == "function" then
        target.prototype.__index = base.prototype.__index
    end
    if type(base.prototype.__newindex) == "function" then
        target.prototype.__newindex = base.prototype.__newindex
    end
    if type(base.prototype.__tostring) == "function" then
        target.prototype.__tostring = base.prototype.__tostring
    end
end

local function __TS__CloneDescriptor(____bindingPattern0)
    local value
    local writable
    local set
    local get
    local configurable
    local enumerable
    enumerable = ____bindingPattern0.enumerable
    configurable = ____bindingPattern0.configurable
    get = ____bindingPattern0.get
    set = ____bindingPattern0.set
    writable = ____bindingPattern0.writable
    value = ____bindingPattern0.value
    local descriptor = {enumerable = enumerable == true, configurable = configurable == true}
    local hasGetterOrSetter = get ~= nil or set ~= nil
    local hasValueOrWritableAttribute = writable ~= nil or value ~= nil
    if hasGetterOrSetter and hasValueOrWritableAttribute then
        error("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute.", 0)
    end
    if get or set then
        descriptor.get = get
        descriptor.set = set
    else
        descriptor.value = value
        descriptor.writable = writable == true
    end
    return descriptor
end

local function __TS__Decorate(self, originalValue, decorators, context)
    local result = originalValue
    do
        local i = #decorators
        while i >= 0 do
            local decorator = decorators[i + 1]
            if decorator ~= nil then
                local ____decorator_result_0 = decorator(self, result, context)
                if ____decorator_result_0 == nil then
                    ____decorator_result_0 = result
                end
                result = ____decorator_result_0
            end
            i = i - 1
        end
    end
    return result
end

local function __TS__ObjectAssign(target, ...)
    local sources = {...}
    for i = 1, #sources do
        local source = sources[i]
        for key in pairs(source) do
            target[key] = source[key]
        end
    end
    return target
end

local function __TS__ObjectGetOwnPropertyDescriptor(object, key)
    local metatable = getmetatable(object)
    if not metatable then
        return
    end
    if not rawget(metatable, "_descriptors") then
        return
    end
    return rawget(metatable, "_descriptors")[key]
end

local __TS__DescriptorGet
do
    local getmetatable = _G.getmetatable
    local ____rawget = _G.rawget
    function __TS__DescriptorGet(self, metatable, key)
        while metatable do
            local rawResult = ____rawget(metatable, key)
            if rawResult ~= nil then
                return rawResult
            end
            local descriptors = ____rawget(metatable, "_descriptors")
            if descriptors then
                local descriptor = descriptors[key]
                if descriptor ~= nil then
                    if descriptor.get then
                        return descriptor.get(self)
                    end
                    return descriptor.value
                end
            end
            metatable = getmetatable(metatable)
        end
    end
end

local __TS__DescriptorSet
do
    local getmetatable = _G.getmetatable
    local ____rawget = _G.rawget
    local rawset = _G.rawset
    function __TS__DescriptorSet(self, metatable, key, value)
        while metatable do
            local descriptors = ____rawget(metatable, "_descriptors")
            if descriptors then
                local descriptor = descriptors[key]
                if descriptor ~= nil then
                    if descriptor.set then
                        descriptor.set(self, value)
                    else
                        if descriptor.writable == false then
                            error(
                                ((("Cannot assign to read only property '" .. key) .. "' of object '") .. tostring(self)) .. "'",
                                0
                            )
                        end
                        descriptor.value = value
                    end
                    return
                end
            end
            metatable = getmetatable(metatable)
        end
        rawset(self, key, value)
    end
end

local __TS__SetDescriptor
do
    local getmetatable = _G.getmetatable
    local function descriptorIndex(self, key)
        return __TS__DescriptorGet(
            self,
            getmetatable(self),
            key
        )
    end
    local function descriptorNewIndex(self, key, value)
        return __TS__DescriptorSet(
            self,
            getmetatable(self),
            key,
            value
        )
    end
    function __TS__SetDescriptor(target, key, desc, isPrototype)
        if isPrototype == nil then
            isPrototype = false
        end
        local ____isPrototype_0
        if isPrototype then
            ____isPrototype_0 = target
        else
            ____isPrototype_0 = getmetatable(target)
        end
        local metatable = ____isPrototype_0
        if not metatable then
            metatable = {}
            setmetatable(target, metatable)
        end
        local value = rawget(target, key)
        if value ~= nil then
            rawset(target, key, nil)
        end
        if not rawget(metatable, "_descriptors") then
            metatable._descriptors = {}
        end
        metatable._descriptors[key] = __TS__CloneDescriptor(desc)
        metatable.__index = descriptorIndex
        metatable.__newindex = descriptorNewIndex
    end
end

local function __TS__DecorateLegacy(decorators, target, key, desc)
    local result = target
    do
        local i = #decorators
        while i >= 0 do
            local decorator = decorators[i + 1]
            if decorator ~= nil then
                local oldResult = result
                if key == nil then
                    result = decorator(nil, result)
                elseif desc == true then
                    local value = rawget(target, key)
                    local descriptor = __TS__ObjectGetOwnPropertyDescriptor(target, key) or ({configurable = true, writable = true, value = value})
                    local desc = decorator(nil, target, key, descriptor) or descriptor
                    local isSimpleValue = desc.configurable == true and desc.writable == true and not desc.get and not desc.set
                    if isSimpleValue then
                        rawset(target, key, desc.value)
                    else
                        __TS__SetDescriptor(
                            target,
                            key,
                            __TS__ObjectAssign({}, descriptor, desc)
                        )
                    end
                elseif desc == false then
                    result = decorator(nil, target, key, desc)
                else
                    result = decorator(nil, target, key)
                end
                result = result or oldResult
            end
            i = i - 1
        end
    end
    return result
end

local function __TS__DecorateParam(paramIndex, decorator)
    return function(____, target, key) return decorator(nil, target, key, paramIndex) end
end

local function __TS__StringIncludes(self, searchString, position)
    if not position then
        position = 1
    else
        position = position + 1
    end
    local index = string.find(self, searchString, position, true)
    return index ~= nil
end

local Error, RangeError, ReferenceError, SyntaxError, TypeError, URIError
do
    local function getErrorStack(self, constructor)
        if debug == nil then
            return nil
        end
        local level = 1
        while true do
            local info = debug.getinfo(level, "f")
            level = level + 1
            if not info then
                level = 1
                break
            elseif info.func == constructor then
                break
            end
        end
        if __TS__StringIncludes(_VERSION, "Lua 5.0") then
            return debug.traceback(("[Level " .. tostring(level)) .. "]")
        elseif _VERSION == "Lua 5.1" then
            return string.sub(
                debug.traceback("", level),
                2
            )
        else
            return debug.traceback(nil, level)
        end
    end
    local function wrapErrorToString(self, getDescription)
        return function(self)
            local description = getDescription(self)
            local caller = debug.getinfo(3, "f")
            local isClassicLua = __TS__StringIncludes(_VERSION, "Lua 5.0")
            if isClassicLua or caller and caller.func ~= error then
                return description
            else
                return (description .. "\n") .. tostring(self.stack)
            end
        end
    end
    local function initErrorClass(self, Type, name)
        Type.name = name
        return setmetatable(
            Type,
            {__call = function(____, _self, message) return __TS__New(Type, message) end}
        )
    end
    local ____initErrorClass_1 = initErrorClass
    local ____class_0 = __TS__Class()
    ____class_0.name = ""
    function ____class_0.prototype.____constructor(self, message)
        if message == nil then
            message = ""
        end
        self.message = message
        self.name = "Error"
        self.stack = getErrorStack(nil, __TS__New)
        local metatable = getmetatable(self)
        if metatable and not metatable.__errorToStringPatched then
            metatable.__errorToStringPatched = true
            metatable.__tostring = wrapErrorToString(nil, metatable.__tostring)
        end
    end
    function ____class_0.prototype.__tostring(self)
        return self.message ~= "" and (self.name .. ": ") .. self.message or self.name
    end
    Error = ____initErrorClass_1(nil, ____class_0, "Error")
    local function createErrorClass(self, name)
        local ____initErrorClass_3 = initErrorClass
        local ____class_2 = __TS__Class()
        ____class_2.name = ____class_2.name
        __TS__ClassExtends(____class_2, Error)
        function ____class_2.prototype.____constructor(self, ...)
            ____class_2.____super.prototype.____constructor(self, ...)
            self.name = name
        end
        return ____initErrorClass_3(nil, ____class_2, name)
    end
    RangeError = createErrorClass(nil, "RangeError")
    ReferenceError = createErrorClass(nil, "ReferenceError")
    SyntaxError = createErrorClass(nil, "SyntaxError")
    TypeError = createErrorClass(nil, "TypeError")
    URIError = createErrorClass(nil, "URIError")
end

local function __TS__ObjectGetOwnPropertyDescriptors(object)
    local metatable = getmetatable(object)
    if not metatable then
        return {}
    end
    return rawget(metatable, "_descriptors") or ({})
end

local function __TS__Delete(target, key)
    local descriptors = __TS__ObjectGetOwnPropertyDescriptors(target)
    local descriptor = descriptors[key]
    if descriptor then
        if not descriptor.configurable then
            error(
                __TS__New(
                    TypeError,
                    ((("Cannot delete property " .. tostring(key)) .. " of ") .. tostring(target)) .. "."
                ),
                0
            )
        end
        descriptors[key] = nil
        return true
    end
    target[key] = nil
    return true
end

local function __TS__StringAccess(self, index)
    if index >= 0 and index < #self then
        return string.sub(self, index + 1, index + 1)
    end
end

local function __TS__DelegatedYield(iterable)
    if type(iterable) == "string" then
        for index = 0, #iterable - 1 do
            coroutine.yield(__TS__StringAccess(iterable, index))
        end
    elseif iterable.____coroutine ~= nil then
        local co = iterable.____coroutine
        while true do
            local status, value = coroutine.resume(co)
            if not status then
                error(value, 0)
            end
            if coroutine.status(co) == "dead" then
                return value
            else
                coroutine.yield(value)
            end
        end
    elseif iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                return result.value
            else
                coroutine.yield(result.value)
            end
        end
    else
        for ____, value in ipairs(iterable) do
            coroutine.yield(value)
        end
    end
end

local function __TS__FunctionBind(fn, ...)
    local boundArgs = {...}
    return function(____, ...)
        local args = {...}
        __TS__ArrayUnshift(
            args,
            __TS__Unpack(boundArgs)
        )
        return fn(__TS__Unpack(args))
    end
end

local __TS__Generator
do
    local function generatorIterator(self)
        return self
    end
    local function generatorNext(self, ...)
        local co = self.____coroutine
        if coroutine.status(co) == "dead" then
            return {done = true}
        end
        local status, value = coroutine.resume(co, ...)
        if not status then
            error(value, 0)
        end
        return {
            value = value,
            done = coroutine.status(co) == "dead"
        }
    end
    function __TS__Generator(fn)
        return function(...)
            local args = {...}
            local argsLength = __TS__CountVarargs(...)
            return {
                ____coroutine = coroutine.create(function() return fn(__TS__Unpack(args, 1, argsLength)) end),
                [Symbol.iterator] = generatorIterator,
                next = generatorNext
            }
        end
    end
end

local function __TS__InstanceOfObject(value)
    local valueType = type(value)
    return valueType == "table" or valueType == "function"
end

local function __TS__LuaIteratorSpread(self, state, firstKey)
    local results = {}
    local key, value = self(state, firstKey)
    while key do
        results[#results + 1] = {key, value}
        key, value = self(state, key)
    end
    return __TS__Unpack(results)
end

local Map
do
    Map = __TS__Class()
    Map.name = "Map"
    function Map.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "Map"
        self.items = {}
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self:set(value[1], value[2])
            end
        else
            local array = entries
            for ____, kvp in ipairs(array) do
                self:set(kvp[1], kvp[2])
            end
        end
    end
    function Map.prototype.clear(self)
        self.items = {}
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Map.prototype.delete(self, key)
        local contains = self:has(key)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[key]
            local previous = self.previousKey[key]
            if next ~= nil and previous ~= nil then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next ~= nil then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous ~= nil then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[key] = nil
            self.previousKey[key] = nil
        end
        self.items[key] = nil
        return contains
    end
    function Map.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(self:keys()) do
            callback(nil, self.items[key], key, self)
        end
    end
    function Map.prototype.get(self, key)
        return self.items[key]
    end
    function Map.prototype.has(self, key)
        return self.nextKey[key] ~= nil or self.lastKey == key
    end
    function Map.prototype.set(self, key, value)
        local isNewValue = not self:has(key)
        if isNewValue then
            self.size = self.size + 1
        end
        self.items[key] = value
        if self.firstKey == nil then
            self.firstKey = key
            self.lastKey = key
        elseif isNewValue then
            self.nextKey[self.lastKey] = key
            self.previousKey[key] = self.lastKey
            self.lastKey = key
        end
        return self
    end
    Map.prototype[Symbol.iterator] = function(self)
        return self:entries()
    end
    function Map.prototype.entries(self)
        local items = self.items
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, items[key]}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.values(self)
        local items = self.items
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = items[key]}
                key = nextKey[key]
                return result
            end
        }
    end
    Map[Symbol.species] = Map
end

local function __TS__MapGroupBy(items, keySelector)
    local result = __TS__New(Map)
    local i = 0
    for ____, item in __TS__Iterator(items) do
        local key = keySelector(nil, item, i)
        if result:has(key) then
            local ____temp_0 = result:get(key)
            ____temp_0[#____temp_0 + 1] = item
        else
            result:set(key, {item})
        end
        i = i + 1
    end
    return result
end

local __TS__Match = string.match

local __TS__MathAtan2 = math.atan2 or math.atan

local __TS__MathModf = math.modf

local function __TS__NumberIsNaN(value)
    return value ~= value
end

local function __TS__MathSign(val)
    if __TS__NumberIsNaN(val) or val == 0 then
        return val
    end
    if val < 0 then
        return -1
    end
    return 1
end

local function __TS__NumberIsFinite(value)
    return type(value) == "number" and value == value and value ~= math.huge and value ~= -math.huge
end

local function __TS__MathTrunc(val)
    if not __TS__NumberIsFinite(val) or val == 0 then
        return val
    end
    return val > 0 and math.floor(val) or math.ceil(val)
end

local function __TS__Number(value)
    local valueType = type(value)
    if valueType == "number" then
        return value
    elseif valueType == "string" then
        local numberValue = tonumber(value)
        if numberValue then
            return numberValue
        end
        if value == "Infinity" then
            return math.huge
        end
        if value == "-Infinity" then
            return -math.huge
        end
        local stringWithoutSpaces = string.gsub(value, "%s", "")
        if stringWithoutSpaces == "" then
            return 0
        end
        return 0 / 0
    elseif valueType == "boolean" then
        return value and 1 or 0
    else
        return 0 / 0
    end
end

local function __TS__NumberIsInteger(value)
    return __TS__NumberIsFinite(value) and math.floor(value) == value
end

local function __TS__StringSubstring(self, start, ____end)
    if ____end ~= ____end then
        ____end = 0
    end
    if ____end ~= nil and start > ____end then
        start, ____end = ____end, start
    end
    if start >= 0 then
        start = start + 1
    else
        start = 1
    end
    if ____end ~= nil and ____end < 0 then
        ____end = 0
    end
    return string.sub(self, start, ____end)
end

local __TS__ParseInt
do
    local parseIntBasePattern = "0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTvVwWxXyYzZ"
    function __TS__ParseInt(numberString, base)
        if base == nil then
            base = 10
            local hexMatch = __TS__Match(numberString, "^%s*-?0[xX]")
            if hexMatch ~= nil then
                base = 16
                numberString = (__TS__Match(hexMatch, "-")) and "-" .. __TS__StringSubstring(numberString, #hexMatch) or __TS__StringSubstring(numberString, #hexMatch)
            end
        end
        if base < 2 or base > 36 then
            return 0 / 0
        end
        local allowedDigits = base <= 10 and __TS__StringSubstring(parseIntBasePattern, 0, base) or __TS__StringSubstring(parseIntBasePattern, 0, 10 + 2 * (base - 10))
        local pattern = ("^%s*(-?[" .. allowedDigits) .. "]*)"
        local number = tonumber((__TS__Match(numberString, pattern)), base)
        if number == nil then
            return 0 / 0
        end
        if number >= 0 then
            return math.floor(number)
        else
            return math.ceil(number)
        end
    end
end

local function __TS__ParseFloat(numberString)
    local infinityMatch = __TS__Match(numberString, "^%s*(-?Infinity)")
    if infinityMatch ~= nil then
        return __TS__StringAccess(infinityMatch, 0) == "-" and -math.huge or math.huge
    end
    local number = tonumber((__TS__Match(numberString, "^%s*(-?%d+%.?%d*)")))
    return number or 0 / 0
end

local __TS__NumberToString
do
    local radixChars = "0123456789abcdefghijklmnopqrstuvwxyz"
    function __TS__NumberToString(self, radix)
        if radix == nil or radix == 10 or self == math.huge or self == -math.huge or self ~= self then
            return tostring(self)
        end
        radix = math.floor(radix)
        if radix < 2 or radix > 36 then
            error("toString() radix argument must be between 2 and 36", 0)
        end
        local integer, fraction = __TS__MathModf(math.abs(self))
        local result = ""
        if radix == 8 then
            result = string.format("%o", integer)
        elseif radix == 16 then
            result = string.format("%x", integer)
        else
            repeat
                do
                    result = __TS__StringAccess(radixChars, integer % radix) .. result
                    integer = math.floor(integer / radix)
                end
            until not (integer ~= 0)
        end
        if fraction ~= 0 then
            result = result .. "."
            local delta = 1e-16
            repeat
                do
                    fraction = fraction * radix
                    delta = delta * radix
                    local digit = math.floor(fraction)
                    result = result .. __TS__StringAccess(radixChars, digit)
                    fraction = fraction - digit
                end
            until not (fraction >= delta)
        end
        if self < 0 then
            result = "-" .. result
        end
        return result
    end
end

local function __TS__NumberToFixed(self, fractionDigits)
    if math.abs(self) >= 1e+21 or self ~= self then
        return tostring(self)
    end
    local f = math.floor(fractionDigits or 0)
    if f < 0 or f > 99 then
        error("toFixed() digits argument must be between 0 and 99", 0)
    end
    return string.format(
        ("%." .. tostring(f)) .. "f",
        self
    )
end

local function __TS__ObjectDefineProperty(target, key, desc)
    local luaKey = type(key) == "number" and key + 1 or key
    local value = rawget(target, luaKey)
    local hasGetterOrSetter = desc.get ~= nil or desc.set ~= nil
    local descriptor
    if hasGetterOrSetter then
        if value ~= nil then
            error(
                "Cannot redefine property: " .. tostring(key),
                0
            )
        end
        descriptor = desc
    else
        local valueExists = value ~= nil
        local ____desc_set_4 = desc.set
        local ____desc_get_5 = desc.get
        local ____desc_configurable_0 = desc.configurable
        if ____desc_configurable_0 == nil then
            ____desc_configurable_0 = valueExists
        end
        local ____desc_enumerable_1 = desc.enumerable
        if ____desc_enumerable_1 == nil then
            ____desc_enumerable_1 = valueExists
        end
        local ____desc_writable_2 = desc.writable
        if ____desc_writable_2 == nil then
            ____desc_writable_2 = valueExists
        end
        local ____temp_3
        if desc.value ~= nil then
            ____temp_3 = desc.value
        else
            ____temp_3 = value
        end
        descriptor = {
            set = ____desc_set_4,
            get = ____desc_get_5,
            configurable = ____desc_configurable_0,
            enumerable = ____desc_enumerable_1,
            writable = ____desc_writable_2,
            value = ____temp_3
        }
    end
    __TS__SetDescriptor(target, luaKey, descriptor)
    return target
end

local function __TS__ObjectEntries(obj)
    local result = {}
    local len = 0
    for key in pairs(obj) do
        len = len + 1
        result[len] = {key, obj[key]}
    end
    return result
end

local function __TS__ObjectFromEntries(entries)
    local obj = {}
    local iterable = entries
    if iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                break
            end
            local value = result.value
            obj[value[1]] = value[2]
        end
    else
        for ____, entry in ipairs(entries) do
            obj[entry[1]] = entry[2]
        end
    end
    return obj
end

local function __TS__ObjectGroupBy(items, keySelector)
    local result = {}
    local i = 0
    for ____, item in __TS__Iterator(items) do
        local key = keySelector(nil, item, i)
        if result[key] ~= nil then
            local ____result_key_0 = result[key]
            ____result_key_0[#____result_key_0 + 1] = item
        else
            result[key] = {item}
        end
        i = i + 1
    end
    return result
end

local function __TS__ObjectKeys(obj)
    local result = {}
    local len = 0
    for key in pairs(obj) do
        len = len + 1
        result[len] = key
    end
    return result
end

local function __TS__ObjectRest(target, usedProperties)
    local result = {}
    for property in pairs(target) do
        if not usedProperties[property] then
            result[property] = target[property]
        end
    end
    return result
end

local function __TS__ObjectValues(obj)
    local result = {}
    local len = 0
    for key in pairs(obj) do
        len = len + 1
        result[len] = obj[key]
    end
    return result
end

local function __TS__PromiseAll(iterable)
    local results = {}
    local toResolve = {}
    local numToResolve = 0
    local i = 0
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                results[i + 1] = item.value
            elseif item.state == 2 then
                return __TS__Promise.reject(item.rejectionReason)
            else
                numToResolve = numToResolve + 1
                toResolve[i] = item
            end
        else
            results[i + 1] = item
        end
        i = i + 1
    end
    if numToResolve == 0 then
        return __TS__Promise.resolve(results)
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for index, promise in pairs(toResolve) do
                promise["then"](
                    promise,
                    function(____, data)
                        results[index + 1] = data
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(nil, results)
                        end
                    end,
                    function(____, reason)
                        reject(nil, reason)
                    end
                )
            end
        end
    )
end

local function __TS__PromiseAllSettled(iterable)
    local results = {}
    local toResolve = {}
    local numToResolve = 0
    local i = 0
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                results[i + 1] = {status = "fulfilled", value = item.value}
            elseif item.state == 2 then
                results[i + 1] = {status = "rejected", reason = item.rejectionReason}
            else
                numToResolve = numToResolve + 1
                toResolve[i] = item
            end
        else
            results[i + 1] = {status = "fulfilled", value = item}
        end
        i = i + 1
    end
    if numToResolve == 0 then
        return __TS__Promise.resolve(results)
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve)
            for index, promise in pairs(toResolve) do
                promise["then"](
                    promise,
                    function(____, data)
                        results[index + 1] = {status = "fulfilled", value = data}
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(nil, results)
                        end
                    end,
                    function(____, reason)
                        results[index + 1] = {status = "rejected", reason = reason}
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(nil, results)
                        end
                    end
                )
            end
        end
    )
end

local function __TS__PromiseAny(iterable)
    local rejections = {}
    local pending = {}
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                return __TS__Promise.resolve(item.value)
            elseif item.state == 2 then
                rejections[#rejections + 1] = item.rejectionReason
            else
                pending[#pending + 1] = item
            end
        else
            return __TS__Promise.resolve(item)
        end
    end
    if #pending == 0 then
        return __TS__Promise.reject("No promises to resolve with .any()")
    end
    local numResolved = 0
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for ____, promise in ipairs(pending) do
                promise["then"](
                    promise,
                    function(____, data)
                        resolve(nil, data)
                    end,
                    function(____, reason)
                        rejections[#rejections + 1] = reason
                        numResolved = numResolved + 1
                        if numResolved == #pending then
                            reject(nil, {name = "AggregateError", message = "All Promises rejected", errors = rejections})
                        end
                    end
                )
            end
        end
    )
end

local function __TS__PromiseRace(iterable)
    local pending = {}
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                return __TS__Promise.resolve(item.value)
            elseif item.state == 2 then
                return __TS__Promise.reject(item.rejectionReason)
            else
                pending[#pending + 1] = item
            end
        else
            return __TS__Promise.resolve(item)
        end
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for ____, promise in ipairs(pending) do
                promise["then"](
                    promise,
                    function(____, value) return resolve(nil, value) end,
                    function(____, reason) return reject(nil, reason) end
                )
            end
        end
    )
end

local Set
do
    Set = __TS__Class()
    Set.name = "Set"
    function Set.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "Set"
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self:add(result.value)
            end
        else
            local array = values
            for ____, value in ipairs(array) do
                self:add(value)
            end
        end
    end
    function Set.prototype.add(self, value)
        local isNewValue = not self:has(value)
        if isNewValue then
            self.size = self.size + 1
        end
        if self.firstKey == nil then
            self.firstKey = value
            self.lastKey = value
        elseif isNewValue then
            self.nextKey[self.lastKey] = value
            self.previousKey[value] = self.lastKey
            self.lastKey = value
        end
        return self
    end
    function Set.prototype.clear(self)
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Set.prototype.delete(self, value)
        local contains = self:has(value)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[value]
            local previous = self.previousKey[value]
            if next ~= nil and previous ~= nil then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next ~= nil then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous ~= nil then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[value] = nil
            self.previousKey[value] = nil
        end
        return contains
    end
    function Set.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(self:keys()) do
            callback(nil, key, key, self)
        end
    end
    function Set.prototype.has(self, value)
        return self.nextKey[value] ~= nil or self.lastKey == value
    end
    Set.prototype[Symbol.iterator] = function(self)
        return self:values()
    end
    function Set.prototype.entries(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, key}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.values(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.union(self, other)
        local result = __TS__New(Set, self)
        for ____, item in __TS__Iterator(other) do
            result:add(item)
        end
        return result
    end
    function Set.prototype.intersection(self, other)
        local result = __TS__New(Set)
        for ____, item in __TS__Iterator(self) do
            if other:has(item) then
                result:add(item)
            end
        end
        return result
    end
    function Set.prototype.difference(self, other)
        local result = __TS__New(Set, self)
        for ____, item in __TS__Iterator(other) do
            result:delete(item)
        end
        return result
    end
    function Set.prototype.symmetricDifference(self, other)
        local result = __TS__New(Set, self)
        for ____, item in __TS__Iterator(other) do
            if self:has(item) then
                result:delete(item)
            else
                result:add(item)
            end
        end
        return result
    end
    function Set.prototype.isSubsetOf(self, other)
        for ____, item in __TS__Iterator(self) do
            if not other:has(item) then
                return false
            end
        end
        return true
    end
    function Set.prototype.isSupersetOf(self, other)
        for ____, item in __TS__Iterator(other) do
            if not self:has(item) then
                return false
            end
        end
        return true
    end
    function Set.prototype.isDisjointFrom(self, other)
        for ____, item in __TS__Iterator(self) do
            if other:has(item) then
                return false
            end
        end
        return true
    end
    Set[Symbol.species] = Set
end

local function __TS__SparseArrayNew(...)
    local sparseArray = {...}
    sparseArray.sparseLength = __TS__CountVarargs(...)
    return sparseArray
end

local function __TS__SparseArrayPush(sparseArray, ...)
    local args = {...}
    local argsLen = __TS__CountVarargs(...)
    local listLen = sparseArray.sparseLength
    for i = 1, argsLen do
        sparseArray[listLen + i] = args[i]
    end
    sparseArray.sparseLength = listLen + argsLen
end

local function __TS__SparseArraySpread(sparseArray)
    local _unpack = unpack or table.unpack
    return _unpack(sparseArray, 1, sparseArray.sparseLength)
end

local WeakMap
do
    WeakMap = __TS__Class()
    WeakMap.name = "WeakMap"
    function WeakMap.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "WeakMap"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self.items[value[1]] = value[2]
            end
        else
            for ____, kvp in ipairs(entries) do
                self.items[kvp[1]] = kvp[2]
            end
        end
    end
    function WeakMap.prototype.delete(self, key)
        local contains = self:has(key)
        self.items[key] = nil
        return contains
    end
    function WeakMap.prototype.get(self, key)
        return self.items[key]
    end
    function WeakMap.prototype.has(self, key)
        return self.items[key] ~= nil
    end
    function WeakMap.prototype.set(self, key, value)
        self.items[key] = value
        return self
    end
    WeakMap[Symbol.species] = WeakMap
end

local WeakSet
do
    WeakSet = __TS__Class()
    WeakSet.name = "WeakSet"
    function WeakSet.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "WeakSet"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self.items[result.value] = true
            end
        else
            for ____, value in ipairs(values) do
                self.items[value] = true
            end
        end
    end
    function WeakSet.prototype.add(self, value)
        self.items[value] = true
        return self
    end
    function WeakSet.prototype.delete(self, value)
        local contains = self:has(value)
        self.items[value] = nil
        return contains
    end
    function WeakSet.prototype.has(self, value)
        return self.items[value] == true
    end
    WeakSet[Symbol.species] = WeakSet
end

local function __TS__SourceMapTraceBack(fileName, sourceMap)
    _G.__TS__sourcemap = _G.__TS__sourcemap or ({})
    _G.__TS__sourcemap[fileName] = sourceMap
    if _G.__TS__originalTraceback == nil then
        local originalTraceback = debug.traceback
        _G.__TS__originalTraceback = originalTraceback
        debug.traceback = function(thread, message, level)
            local trace
            if thread == nil and message == nil and level == nil then
                trace = originalTraceback()
            elseif __TS__StringIncludes(_VERSION, "Lua 5.0") then
                trace = originalTraceback((("[Level " .. tostring(level)) .. "] ") .. tostring(message))
            else
                trace = originalTraceback(thread, message, level)
            end
            if type(trace) ~= "string" then
                return trace
            end
            local function replacer(____, file, srcFile, line)
                local fileSourceMap = _G.__TS__sourcemap[file]
                if fileSourceMap ~= nil and fileSourceMap[line] ~= nil then
                    local data = fileSourceMap[line]
                    if type(data) == "number" then
                        return (srcFile .. ":") .. tostring(data)
                    end
                    return (data.file .. ":") .. tostring(data.line)
                end
                return (file .. ":") .. line
            end
            local result = string.gsub(
                trace,
                "(%S+)%.lua:(%d+)",
                function(file, line) return replacer(nil, file .. ".lua", file .. ".ts", line) end
            )
            local function stringReplacer(____, file, line)
                local fileSourceMap = _G.__TS__sourcemap[file]
                if fileSourceMap ~= nil and fileSourceMap[line] ~= nil then
                    local chunkName = (__TS__Match(file, "%[string \"([^\"]+)\"%]"))
                    local sourceName = string.gsub(chunkName, ".lua$", ".ts")
                    local data = fileSourceMap[line]
                    if type(data) == "number" then
                        return (sourceName .. ":") .. tostring(data)
                    end
                    return (data.file .. ":") .. tostring(data.line)
                end
                return (file .. ":") .. line
            end
            result = string.gsub(
                result,
                "(%[string \"[^\"]+\"%]):(%d+)",
                function(file, line) return stringReplacer(nil, file, line) end
            )
            return result
        end
    end
end

local function __TS__Spread(iterable)
    local arr = {}
    if type(iterable) == "string" then
        for i = 0, #iterable - 1 do
            arr[i + 1] = __TS__StringAccess(iterable, i)
        end
    else
        local len = 0
        for ____, item in __TS__Iterator(iterable) do
            len = len + 1
            arr[len] = item
        end
    end
    return __TS__Unpack(arr)
end

local function __TS__StringCharAt(self, pos)
    if pos ~= pos then
        pos = 0
    end
    if pos < 0 then
        return ""
    end
    return string.sub(self, pos + 1, pos + 1)
end

local function __TS__StringCharCodeAt(self, index)
    if index ~= index then
        index = 0
    end
    if index < 0 then
        return 0 / 0
    end
    return string.byte(self, index + 1) or 0 / 0
end

local function __TS__StringEndsWith(self, searchString, endPosition)
    if endPosition == nil or endPosition > #self then
        endPosition = #self
    end
    return string.sub(self, endPosition - #searchString + 1, endPosition) == searchString
end

local function __TS__StringPadEnd(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if maxLength == -math.huge or maxLength == math.huge then
        error("Invalid string length", 0)
    end
    if #self >= maxLength or #fillString == 0 then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = fillString .. string.rep(
            fillString,
            math.floor(maxLength / #fillString)
        )
    end
    return self .. string.sub(
        fillString,
        1,
        math.floor(maxLength)
    )
end

local function __TS__StringPadStart(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if maxLength == -math.huge or maxLength == math.huge then
        error("Invalid string length", 0)
    end
    if #self >= maxLength or #fillString == 0 then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = fillString .. string.rep(
            fillString,
            math.floor(maxLength / #fillString)
        )
    end
    return string.sub(
        fillString,
        1,
        math.floor(maxLength)
    ) .. self
end

local __TS__StringReplace
do
    local sub = string.sub
    function __TS__StringReplace(source, searchValue, replaceValue)
        local startPos, endPos = string.find(source, searchValue, nil, true)
        if not startPos then
            return source
        end
        local before = sub(source, 1, startPos - 1)
        local replacement = type(replaceValue) == "string" and replaceValue or replaceValue(nil, searchValue, startPos - 1, source)
        local after = sub(source, endPos + 1)
        return (before .. replacement) .. after
    end
end

local __TS__StringSplit
do
    local sub = string.sub
    local find = string.find
    function __TS__StringSplit(source, separator, limit)
        if limit == nil then
            limit = 4294967295
        end
        if limit == 0 then
            return {}
        end
        local result = {}
        local resultIndex = 1
        if separator == nil or separator == "" then
            for i = 1, #source do
                result[resultIndex] = sub(source, i, i)
                resultIndex = resultIndex + 1
            end
        else
            local currentPos = 1
            while resultIndex <= limit do
                local startPos, endPos = find(source, separator, currentPos, true)
                if not startPos then
                    break
                end
                result[resultIndex] = sub(source, currentPos, startPos - 1)
                resultIndex = resultIndex + 1
                currentPos = endPos + 1
            end
            if resultIndex <= limit then
                result[resultIndex] = sub(source, currentPos)
            end
        end
        return result
    end
end

local __TS__StringReplaceAll
do
    local sub = string.sub
    local find = string.find
    function __TS__StringReplaceAll(source, searchValue, replaceValue)
        if type(replaceValue) == "string" then
            local concat = table.concat(
                __TS__StringSplit(source, searchValue),
                replaceValue
            )
            if #searchValue == 0 then
                return (replaceValue .. concat) .. replaceValue
            end
            return concat
        end
        local parts = {}
        local partsIndex = 1
        if #searchValue == 0 then
            parts[1] = replaceValue(nil, "", 0, source)
            partsIndex = 2
            for i = 1, #source do
                parts[partsIndex] = sub(source, i, i)
                parts[partsIndex + 1] = replaceValue(nil, "", i, source)
                partsIndex = partsIndex + 2
            end
        else
            local currentPos = 1
            while true do
                local startPos, endPos = find(source, searchValue, currentPos, true)
                if not startPos then
                    break
                end
                parts[partsIndex] = sub(source, currentPos, startPos - 1)
                parts[partsIndex + 1] = replaceValue(nil, searchValue, startPos - 1, source)
                partsIndex = partsIndex + 2
                currentPos = endPos + 1
            end
            parts[partsIndex] = sub(source, currentPos)
        end
        return table.concat(parts)
    end
end

local function __TS__StringSlice(self, start, ____end)
    if start == nil or start ~= start then
        start = 0
    end
    if ____end ~= ____end then
        ____end = 0
    end
    if start >= 0 then
        start = start + 1
    end
    if ____end ~= nil and ____end < 0 then
        ____end = ____end - 1
    end
    return string.sub(self, start, ____end)
end

local function __TS__StringStartsWith(self, searchString, position)
    if position == nil or position < 0 then
        position = 0
    end
    return string.sub(self, position + 1, #searchString + position) == searchString
end

local function __TS__StringSubstr(self, from, length)
    if from ~= from then
        from = 0
    end
    if length ~= nil then
        if length ~= length or length <= 0 then
            return ""
        end
        length = length + from
    end
    if from >= 0 then
        from = from + 1
    end
    return string.sub(self, from, length)
end

local function __TS__StringTrim(self)
    local result = string.gsub(self, "^[%s ﻿]*(.-)[%s ﻿]*$", "%1")
    return result
end

local function __TS__StringTrimEnd(self)
    local result = string.gsub(self, "[%s ﻿]*$", "")
    return result
end

local function __TS__StringTrimStart(self)
    local result = string.gsub(self, "^[%s ﻿]*", "")
    return result
end

local __TS__SymbolRegistryFor, __TS__SymbolRegistryKeyFor
do
    local symbolRegistry = {}
    function __TS__SymbolRegistryFor(key)
        if not symbolRegistry[key] then
            symbolRegistry[key] = __TS__Symbol(key)
        end
        return symbolRegistry[key]
    end
    function __TS__SymbolRegistryKeyFor(sym)
        for key in pairs(symbolRegistry) do
            if symbolRegistry[key] == sym then
                return key
            end
        end
        return nil
    end
end

local function __TS__TypeOf(value)
    local luaType = type(value)
    if luaType == "table" then
        return "object"
    elseif luaType == "nil" then
        return "undefined"
    else
        return luaType
    end
end

local function __TS__Using(self, cb, ...)
    local args = {...}
    local thrownError
    local ok, result = xpcall(
        function() return cb(__TS__Unpack(args)) end,
        function(err)
            thrownError = err
            return thrownError
        end
    )
    local argArray = {__TS__Unpack(args)}
    do
        local i = #argArray - 1
        while i >= 0 do
            local ____self_0 = argArray[i + 1]
            ____self_0[Symbol.dispose](____self_0)
            i = i - 1
        end
    end
    if not ok then
        error(thrownError, 0)
    end
    return result
end

local function __TS__UsingAsync(self, cb, ...)
    local args = {...}
    return __TS__AsyncAwaiter(function(____awaiter_resolve)
        local thrownError
        local ok, result = xpcall(
            function() return cb(
                nil,
                __TS__Unpack(args)
            ) end,
            function(err)
                thrownError = err
                return thrownError
            end
        )
        local argArray = {__TS__Unpack(args)}
        do
            local i = #argArray - 1
            while i >= 0 do
                if argArray[i + 1][Symbol.dispose] ~= nil then
                    local ____self_0 = argArray[i + 1]
                    ____self_0[Symbol.dispose](____self_0)
                end
                if argArray[i + 1][Symbol.asyncDispose] ~= nil then
                    local ____self_1 = argArray[i + 1]
                    __TS__Await(____self_1[Symbol.asyncDispose](____self_1))
                end
                i = i - 1
            end
        end
        if not ok then
            error(thrownError, 0)
        end
        return ____awaiter_resolve(nil, result)
    end)
end

return {
  __TS__ArrayAt = __TS__ArrayAt,
  __TS__ArrayConcat = __TS__ArrayConcat,
  __TS__ArrayEntries = __TS__ArrayEntries,
  __TS__ArrayEvery = __TS__ArrayEvery,
  __TS__ArrayFill = __TS__ArrayFill,
  __TS__ArrayFilter = __TS__ArrayFilter,
  __TS__ArrayForEach = __TS__ArrayForEach,
  __TS__ArrayFind = __TS__ArrayFind,
  __TS__ArrayFindIndex = __TS__ArrayFindIndex,
  __TS__ArrayFrom = __TS__ArrayFrom,
  __TS__ArrayIncludes = __TS__ArrayIncludes,
  __TS__ArrayIndexOf = __TS__ArrayIndexOf,
  __TS__ArrayIsArray = __TS__ArrayIsArray,
  __TS__ArrayJoin = __TS__ArrayJoin,
  __TS__ArrayMap = __TS__ArrayMap,
  __TS__ArrayPush = __TS__ArrayPush,
  __TS__ArrayPushArray = __TS__ArrayPushArray,
  __TS__ArrayReduce = __TS__ArrayReduce,
  __TS__ArrayReduceRight = __TS__ArrayReduceRight,
  __TS__ArrayReverse = __TS__ArrayReverse,
  __TS__ArrayUnshift = __TS__ArrayUnshift,
  __TS__ArraySort = __TS__ArraySort,
  __TS__ArraySlice = __TS__ArraySlice,
  __TS__ArraySome = __TS__ArraySome,
  __TS__ArraySplice = __TS__ArraySplice,
  __TS__ArrayToObject = __TS__ArrayToObject,
  __TS__ArrayFlat = __TS__ArrayFlat,
  __TS__ArrayFlatMap = __TS__ArrayFlatMap,
  __TS__ArraySetLength = __TS__ArraySetLength,
  __TS__ArrayToReversed = __TS__ArrayToReversed,
  __TS__ArrayToSorted = __TS__ArrayToSorted,
  __TS__ArrayToSpliced = __TS__ArrayToSpliced,
  __TS__ArrayWith = __TS__ArrayWith,
  __TS__AsyncAwaiter = __TS__AsyncAwaiter,
  __TS__Await = __TS__Await,
  __TS__Class = __TS__Class,
  __TS__ClassExtends = __TS__ClassExtends,
  __TS__CloneDescriptor = __TS__CloneDescriptor,
  __TS__CountVarargs = __TS__CountVarargs,
  __TS__Decorate = __TS__Decorate,
  __TS__DecorateLegacy = __TS__DecorateLegacy,
  __TS__DecorateParam = __TS__DecorateParam,
  __TS__Delete = __TS__Delete,
  __TS__DelegatedYield = __TS__DelegatedYield,
  __TS__DescriptorGet = __TS__DescriptorGet,
  __TS__DescriptorSet = __TS__DescriptorSet,
  Error = Error,
  RangeError = RangeError,
  ReferenceError = ReferenceError,
  SyntaxError = SyntaxError,
  TypeError = TypeError,
  URIError = URIError,
  __TS__FunctionBind = __TS__FunctionBind,
  __TS__Generator = __TS__Generator,
  __TS__InstanceOf = __TS__InstanceOf,
  __TS__InstanceOfObject = __TS__InstanceOfObject,
  __TS__Iterator = __TS__Iterator,
  __TS__LuaIteratorSpread = __TS__LuaIteratorSpread,
  Map = Map,
  __TS__MapGroupBy = __TS__MapGroupBy,
  __TS__Match = __TS__Match,
  __TS__MathAtan2 = __TS__MathAtan2,
  __TS__MathModf = __TS__MathModf,
  __TS__MathSign = __TS__MathSign,
  __TS__MathTrunc = __TS__MathTrunc,
  __TS__New = __TS__New,
  __TS__Number = __TS__Number,
  __TS__NumberIsFinite = __TS__NumberIsFinite,
  __TS__NumberIsInteger = __TS__NumberIsInteger,
  __TS__NumberIsNaN = __TS__NumberIsNaN,
  __TS__ParseInt = __TS__ParseInt,
  __TS__ParseFloat = __TS__ParseFloat,
  __TS__NumberToString = __TS__NumberToString,
  __TS__NumberToFixed = __TS__NumberToFixed,
  __TS__ObjectAssign = __TS__ObjectAssign,
  __TS__ObjectDefineProperty = __TS__ObjectDefineProperty,
  __TS__ObjectEntries = __TS__ObjectEntries,
  __TS__ObjectFromEntries = __TS__ObjectFromEntries,
  __TS__ObjectGetOwnPropertyDescriptor = __TS__ObjectGetOwnPropertyDescriptor,
  __TS__ObjectGetOwnPropertyDescriptors = __TS__ObjectGetOwnPropertyDescriptors,
  __TS__ObjectGroupBy = __TS__ObjectGroupBy,
  __TS__ObjectKeys = __TS__ObjectKeys,
  __TS__ObjectRest = __TS__ObjectRest,
  __TS__ObjectValues = __TS__ObjectValues,
  __TS__ParseFloat = __TS__ParseFloat,
  __TS__ParseInt = __TS__ParseInt,
  __TS__Promise = __TS__Promise,
  __TS__PromiseAll = __TS__PromiseAll,
  __TS__PromiseAllSettled = __TS__PromiseAllSettled,
  __TS__PromiseAny = __TS__PromiseAny,
  __TS__PromiseRace = __TS__PromiseRace,
  Set = Set,
  __TS__SetDescriptor = __TS__SetDescriptor,
  __TS__SparseArrayNew = __TS__SparseArrayNew,
  __TS__SparseArrayPush = __TS__SparseArrayPush,
  __TS__SparseArraySpread = __TS__SparseArraySpread,
  WeakMap = WeakMap,
  WeakSet = WeakSet,
  __TS__SourceMapTraceBack = __TS__SourceMapTraceBack,
  __TS__Spread = __TS__Spread,
  __TS__StringAccess = __TS__StringAccess,
  __TS__StringCharAt = __TS__StringCharAt,
  __TS__StringCharCodeAt = __TS__StringCharCodeAt,
  __TS__StringEndsWith = __TS__StringEndsWith,
  __TS__StringIncludes = __TS__StringIncludes,
  __TS__StringPadEnd = __TS__StringPadEnd,
  __TS__StringPadStart = __TS__StringPadStart,
  __TS__StringReplace = __TS__StringReplace,
  __TS__StringReplaceAll = __TS__StringReplaceAll,
  __TS__StringSlice = __TS__StringSlice,
  __TS__StringSplit = __TS__StringSplit,
  __TS__StringStartsWith = __TS__StringStartsWith,
  __TS__StringSubstr = __TS__StringSubstr,
  __TS__StringSubstring = __TS__StringSubstring,
  __TS__StringTrim = __TS__StringTrim,
  __TS__StringTrimEnd = __TS__StringTrimEnd,
  __TS__StringTrimStart = __TS__StringTrimStart,
  __TS__Symbol = __TS__Symbol,
  Symbol = Symbol,
  __TS__SymbolRegistryFor = __TS__SymbolRegistryFor,
  __TS__SymbolRegistryKeyFor = __TS__SymbolRegistryKeyFor,
  __TS__TypeOf = __TS__TypeOf,
  __TS__Unpack = __TS__Unpack,
  __TS__Using = __TS__Using,
  __TS__UsingAsync = __TS__UsingAsync
}
 end,
["dsl.result"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.success(data)
    return {data = data, success = true}
end
function ____exports.failure(reason, position)
    return {position = position, reason = reason, success = false}
end
return ____exports
 end,
["dsl.tokenizer"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__StringReplaceAll = ____lualib.__TS__StringReplaceAll
local __TS__StringAccess = ____lualib.__TS__StringAccess
local __TS__ParseFloat = ____lualib.__TS__ParseFloat
local __TS__StringSlice = ____lualib.__TS__StringSlice
local ____exports = {}
local isAlpha, isAlphaNumeric, isDigit, isWhitespace
local ____result = require("dsl.result")
local failure = ____result.failure
local Position = ____result.Position
local Result = ____result.Result
local success = ____result.success
function isAlpha(char)
    return char >= "a" and char <= "z" or char >= "A" and char <= "Z"
end
function isAlphaNumeric(char)
    return isAlpha(char) or isDigit(char)
end
function isDigit(char)
    return char >= "0" and char <= "9"
end
function isWhitespace(char)
    return char == " " or char == "\n" or char == "\t"
end
____exports.symbols = {
    ",",
    ":",
    "!",
    "(",
    ")",
    "{",
    "}",
    "@",
    "&",
    "%",
    "<=",
    "<",
    ">=",
    ">",
    "|"
}
____exports.Tokenizer = __TS__Class()
local Tokenizer = ____exports.Tokenizer
Tokenizer.name = "Tokenizer"
function Tokenizer.prototype.____constructor(self, input)
    self.position = {column = 1, index = 0, line = 1}
    self.input = __TS__StringReplaceAll(input, "\r\n", "\n")
end
function Tokenizer.prototype.next(self)
    local char = self:getCurrentChar()
    while isWhitespace(char) do
        char = self:advance()
    end
    if char == "" then
        return
    end
    return self:readComment(self.position) or self:readKeyword(self.position) or self:readNumber(self.position) or self:readString(self.position) or self:readSymbol(self.position) or failure("Invalid character: " .. char, self.position)
end
function Tokenizer.prototype.advance(self)
    local ____self_position_0 = self.position
    local column = ____self_position_0.column
    local line = ____self_position_0.line
    local index = ____self_position_0.index
    if self:getCurrentChar() == "\n" then
        self.position = {column = 1, index = index + 1, line = line + 1}
    else
        self.position = {column = column + 1, index = index + 1, line = line}
    end
    return self:getCurrentChar()
end
function Tokenizer.prototype.getCurrentChar(self)
    return __TS__StringAccess(self.input, self.position.index) or ""
end
function Tokenizer.prototype.readComment(self, position)
    local char = self:getCurrentChar()
    if char ~= "#" then
        return
    end
    char = self:advance()
    local value = ""
    while char ~= "" and char ~= "\n" do
        value = value .. char
        char = self:advance()
    end
    return success({position = position, type = "comment", value = value})
end
function Tokenizer.prototype.readKeyword(self, position)
    local char = self:getCurrentChar()
    if not isAlpha(char) then
        return
    end
    local value = ""
    repeat
        do
            value = value .. char
            char = self:advance()
        end
    until not isAlphaNumeric(char)
    return success({position = position, type = "keyword", value = value})
end
function Tokenizer.prototype.readNumber(self, position)
    local char = self:getCurrentChar()
    if not isDigit(char) then
        return
    end
    local value = ""
    if char == "0" then
        value = value .. char
        char = self:advance()
        if isDigit(char) then
            return failure("Malformed number - leading zero not allowed", position)
        end
    else
        repeat
            do
                value = value .. char
                char = self:advance()
            end
        until not isDigit(char)
    end
    if char == "." then
        value = value .. char
        char = self:advance()
        if not isDigit(char) then
            return failure("Malformed number - decimal point must be followed by digits", position)
        end
        repeat
            do
                value = value .. char
                char = self:advance()
            end
        until not isDigit(char)
        if char == "." then
            return failure("Malformed number - multiple decimal points", position)
        end
    end
    return success({
        position = position,
        type = "number",
        value = __TS__ParseFloat(value)
    })
end
function Tokenizer.prototype.readString(self, position)
    local char = self:getCurrentChar()
    if char ~= "\"" then
        return
    end
    char = self:advance()
    local value = ""
    while char ~= "" and char ~= "\"" do
        if char == "\n" then
            return failure("Unterminated string - newlines are not allowed in strings", position)
        end
        if char == "\\" then
            char = self:advance()
            if char == "\"" then
                value = value .. char
                char = self:advance()
            elseif char == "" then
                return failure("Unterminated string escape sequence", position)
            else
                return failure("Unsupported string escape sequence: \\" .. char, position)
            end
        else
            value = value .. char
            char = self:advance()
        end
    end
    if char ~= "\"" then
        return failure("Unterminated string - missing closing quote", position)
    end
    self:advance()
    return success({position = position, type = "string", value = value})
end
function Tokenizer.prototype.readSymbol(self, position)
    local ____position_1 = position
    local column = ____position_1.column
    local index = ____position_1.index
    local line = ____position_1.line
    for ____, value in ipairs(____exports.symbols) do
        if __TS__StringSlice(self.input, index, index + #value) == value then
            self.position = {column = column + #value, index = index + #value, line = line}
            return success({position = position, type = "symbol", value = value})
        end
    end
    return
end
return ____exports
 end,
["dsl.parser"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__InstanceOf = ____lualib.__TS__InstanceOf
local __TS__NumberIsInteger = ____lualib.__TS__NumberIsInteger
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local ____exports = {}
local ParseError
local ____result = require("dsl.result")
local Failure = ____result.Failure
local failure = ____result.failure
local Result = ____result.Result
local success = ____result.success
local ____tokenizer = require("dsl.tokenizer")
local Token = ____tokenizer.Token
local Tokenizer = ____tokenizer.Tokenizer
____exports.Parser = __TS__Class()
local Parser = ____exports.Parser
Parser.name = "Parser"
function Parser.prototype.____constructor(self, input)
    self.tokenizer = __TS__New(Tokenizer, input)
    self:consumeAny()
end
function Parser.prototype.parse(self)
    do
        local function ____catch(____error)
            if __TS__InstanceOf(____error, ParseError) then
                return true, ____error.result
            end
            error(____error, 0)
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local configurations = {}
            while self.currentToken do
                configurations[#configurations + 1] = self:parseConfiguration()
            end
            return true, success(configurations)
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function Parser.prototype.parseConfiguration(self)
    local configuration = self:parseSpellConfiguration() or self:parseItemConfiguration()
    if not configuration then
        local ____ParseError_3 = ParseError
        local ____failure_2 = failure
        local ____opt_0 = self.currentToken
        error(
            __TS__New(
                ____ParseError_3,
                ____failure_2("Expected configuration", ____opt_0 and ____opt_0.position)
            ),
            0
        )
    end
    return configuration
end
function Parser.prototype.parseSpellConfiguration(self)
    if not self:tryConsumeKeyword("spell") then
        return
    end
    self:consumeSymbol(":")
    local spellName = self:consumeAnyString()
    return {
        spellName = spellName,
        type = "spell",
        visualStates = self:parseVisualStates()
    }
end
function Parser.prototype.parseItemConfiguration(self)
    if not self:tryConsumeKeyword("item") then
        return
    end
    self:consumeSymbol(":")
    local itemIds = {self:consumeAnyInteger()}
    while self:tryConsumeSymbol(",") do
        itemIds[#itemIds + 1] = self:consumeAnyInteger()
    end
    return {
        itemIds = itemIds,
        type = "item",
        visualStates = self:parseVisualStates()
    }
end
function Parser.prototype.parseVisualStates(self)
    local visualStates = {}
    for ____, keyword in ipairs({
        "blocked",
        "depleted",
        "checked",
        "enabled",
        "flashing",
        "glowing"
    }) do
        if self:tryConsumeKeyword(keyword) then
            self:consumeSymbol(":")
            visualStates[keyword] = self:parseRule()
        end
    end
    return visualStates
end
function Parser.prototype.parseRule(self)
    return self:parseRuleOr()
end
function Parser.prototype.parseRuleOr(self)
    local rules = {self:parseRuleAnd()}
    while self:tryConsumeSymbol("|") do
        rules[#rules + 1] = self:parseRuleAnd()
    end
    if #rules == 1 then
        return rules[1]
    end
    return {rules = rules, type = "or"}
end
function Parser.prototype.parseRuleAnd(self)
    local rules = {self:parseRuleUnary()}
    while self:tryConsumeSymbol("&") do
        rules[#rules + 1] = self:parseRuleUnary()
    end
    if #rules == 1 then
        return rules[1]
    end
    return {rules = rules, type = "and"}
end
function Parser.prototype.parseRuleUnary(self)
    if self:tryConsumeSymbol("(") then
        local rule = self:parseRule()
        self:consumeSymbol(")")
        return rule
    end
    return self:parseScope()
end
function Parser.prototype.parseScope(self)
    self:consumeSymbol("@")
    local unitId = self:consumeAnyKeyword()
    local modifier
    if self:tryConsumeSymbol(":") then
        modifier = self:consumeKeyword("help")
    end
    self:consumeSymbol("{")
    local condition = self:parseCondition()
    self:consumeSymbol("}")
    return {condition = condition, type = "scope", unit = modifier and ({modifier = modifier, unitId = unitId}) or ({unitId = unitId})}
end
function Parser.prototype.parseCondition(self)
    return self:parseConditionOr()
end
function Parser.prototype.parseConditionOr(self)
    local conditions = {self:parseConditionAnd()}
    while self:tryConsumeSymbol("|") do
        conditions[#conditions + 1] = self:parseConditionAnd()
    end
    if #conditions == 1 then
        return conditions[1]
    end
    return {conditions = conditions, type = "or"}
end
function Parser.prototype.parseConditionAnd(self)
    local conditions = {self:parseConditionUnary()}
    while self:tryConsumeSymbol("&") do
        conditions[#conditions + 1] = self:parseConditionUnary()
    end
    if #conditions == 1 then
        return conditions[1]
    end
    return {conditions = conditions, type = "and"}
end
function Parser.prototype.parseConditionUnary(self)
    if self:tryConsumeSymbol("!") then
        return {
            condition = self:parseConditionUnary(),
            type = "not"
        }
    end
    if self:tryConsumeSymbol("(") then
        local condition = self:parseCondition()
        self:consumeSymbol(")")
        return condition
    end
    return self:parsePredicate()
end
function Parser.prototype.parsePredicate(self)
    local predicateName = self:consumeAnyKeyword()
    local args = {}
    if self:tryConsumeSymbol("(") then
        args[#args + 1] = self:parseArgument()
        while self:tryConsumeSymbol(",") do
            args[#args + 1] = self:parseArgument()
        end
        self:consumeSymbol(")")
    end
    return {args = args, predicateName = predicateName, type = "predicate"}
end
function Parser.prototype.parseArgument(self)
    local operatorResult = self:tryConsumeSymbol("<", "<=", ">", ">=")
    if operatorResult then
        local operator = operatorResult.value
        local value = self:consumeAnyNumber()
        if self:tryConsumeSymbol("%") then
            return {operator = operator, threshold = {type = "percentage", value = value}, type = "comparison"}
        end
        if self:tryConsumeKeyword("s") then
            return {operator = operator, threshold = {type = "duration", value = value}, type = "comparison"}
        end
        return {operator = operator, threshold = value, type = "comparison"}
    end
    local stringResult = self:tryConsumeAnyString()
    if stringResult then
        return stringResult.value
    end
    local numberResult = self:tryConsumeAnyNumber()
    if numberResult then
        if self:tryConsumeSymbol("%") then
            return {type = "percentage", value = numberResult.value}
        end
        if self:tryConsumeKeyword("s") then
            return {type = "duration", value = numberResult.value}
        end
        return numberResult.value
    end
    if self:tryConsumeSymbol("@") then
        return self:consumeAnyKeyword()
    end
    return self:consumeAnyKeyword()
end
function Parser.prototype.consumeAny(self)
    local ____opt_4 = self.currentToken
    local value = ____opt_4 and ____opt_4.value
    repeat
        do
            local result = self.tokenizer:next()
            self.currentToken = nil
            if not result then
                break
            end
            if not result.success then
                error(
                    __TS__New(ParseError, result),
                    0
                )
            end
            self.currentToken = result.data
        end
    until not (self.currentToken.type == "comment")
    return value
end
function Parser.prototype.consumeAnyInteger(self)
    local ____opt_6 = self.currentToken
    if (____opt_6 and ____opt_6.type) ~= "number" or not __TS__NumberIsInteger(self.currentToken.value) then
        local ____ParseError_11 = ParseError
        local ____failure_10 = failure
        local ____opt_8 = self.currentToken
        error(
            __TS__New(
                ____ParseError_11,
                ____failure_10("Expected integer", ____opt_8 and ____opt_8.position)
            ),
            0
        )
    end
    return self:consumeAny()
end
function Parser.prototype.consumeAnyKeyword(self)
    local ____opt_12 = self.currentToken
    if (____opt_12 and ____opt_12.type) ~= "keyword" then
        local ____ParseError_17 = ParseError
        local ____failure_16 = failure
        local ____opt_14 = self.currentToken
        error(
            __TS__New(
                ____ParseError_17,
                ____failure_16("Expected keyword", ____opt_14 and ____opt_14.position)
            ),
            0
        )
    end
    return self:consumeAny()
end
function Parser.prototype.consumeAnyNumber(self)
    local ____opt_18 = self.currentToken
    if (____opt_18 and ____opt_18.type) ~= "number" then
        local ____ParseError_23 = ParseError
        local ____failure_22 = failure
        local ____opt_20 = self.currentToken
        error(
            __TS__New(
                ____ParseError_23,
                ____failure_22("Expected number", ____opt_20 and ____opt_20.position)
            ),
            0
        )
    end
    return self:consumeAny()
end
function Parser.prototype.consumeAnyString(self)
    if not self.currentToken or self.currentToken.type ~= "string" then
        local ____ParseError_27 = ParseError
        local ____failure_26 = failure
        local ____opt_24 = self.currentToken
        error(
            __TS__New(
                ____ParseError_27,
                ____failure_26("Expected string", ____opt_24 and ____opt_24.position)
            ),
            0
        )
    end
    return self:consumeAny()
end
function Parser.prototype.consumeKeyword(self, ...)
    local values = {...}
    local ____opt_28 = self.currentToken
    if (____opt_28 and ____opt_28.type) ~= "keyword" or not __TS__ArrayIncludes(values, self.currentToken.value) then
        local ____ParseError_34 = ParseError
        local ____failure_33 = failure
        local ____temp_32 = "Expected keyword " .. table.concat(
            __TS__ArrayMap(
                values,
                function(____, value) return ("'" .. value) .. "'" end
            ),
            " or "
        )
        local ____opt_30 = self.currentToken
        error(
            __TS__New(
                ____ParseError_34,
                ____failure_33(____temp_32, ____opt_30 and ____opt_30.position)
            ),
            0
        )
    end
    return self:consumeAny()
end
function Parser.prototype.consumeSymbol(self, value)
    local ____opt_35 = self.currentToken
    if (____opt_35 and ____opt_35.type) ~= "symbol" or self.currentToken.value ~= value then
        local ____ParseError_41 = ParseError
        local ____failure_40 = failure
        local ____temp_39 = ("Expected symbol '" .. value) .. "'"
        local ____opt_37 = self.currentToken
        error(
            __TS__New(
                ____ParseError_41,
                ____failure_40(____temp_39, ____opt_37 and ____opt_37.position)
            ),
            0
        )
    end
    self:consumeAny()
end
function Parser.prototype.tryConsumeAnyNumber(self)
    local ____opt_42 = self.currentToken
    return (____opt_42 and ____opt_42.type) == "number" and ({value = self:consumeAny()}) or false
end
function Parser.prototype.tryConsumeAnyString(self)
    local ____opt_44 = self.currentToken
    return (____opt_44 and ____opt_44.type) == "string" and ({value = self:consumeAny()}) or false
end
function Parser.prototype.tryConsumeKeyword(self, value)
    local ____opt_46 = self.currentToken
    if (____opt_46 and ____opt_46.type) ~= "keyword" or self.currentToken.value ~= value then
        return false
    end
    self:consumeAny()
    return true
end
function Parser.prototype.tryConsumeSymbol(self, ...)
    local values = {...}
    local ____opt_48 = self.currentToken
    return (____opt_48 and ____opt_48.type) == "symbol" and __TS__ArrayIncludes(values, self.currentToken.value) and ({value = self:consumeAny()}) or false
end
ParseError = __TS__Class()
ParseError.name = "ParseError"
__TS__ClassExtends(ParseError, Error)
function ParseError.prototype.____constructor(self, result)
    Error.prototype.____constructor(self)
    self.result = result
end
return ____exports
 end,
["dsl.comparison-function"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local toNumber
local ____parser = require("dsl.parser")
local ComparisonOperator = ____parser.ComparisonOperator
local Duration = ____parser.Duration
local Percentage = ____parser.Percentage
function toNumber(value)
    if type(value) == "number" then
        return value
    end
    return value.value
end
function ____exports.createComparisonFunction(expectedType, operator, threshold)
    local actualType = type(threshold) == "number" and "number" or threshold.type
    if actualType ~= expectedType then
        return
    end
    local thresholdValue = toNumber(threshold)
    repeat
        local ____switch4 = operator
        local ____cond4 = ____switch4 == "<"
        if ____cond4 then
            return function(value) return toNumber(value) < thresholdValue end
        end
        ____cond4 = ____cond4 or ____switch4 == "<="
        if ____cond4 then
            return function(value) return toNumber(value) <= thresholdValue end
        end
        ____cond4 = ____cond4 or ____switch4 == ">"
        if ____cond4 then
            return function(value) return toNumber(value) > thresholdValue end
        end
        ____cond4 = ____cond4 or ____switch4 == ">="
        if ____cond4 then
            return function(value) return toNumber(value) >= thresholdValue end
        end
        ____cond4 = ____cond4 or ____switch4 == "=="
        if ____cond4 then
            return function(value) return toNumber(value) == thresholdValue end
        end
    until true
end
return ____exports
 end,
["dsl.creature-type"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local ____exports = {}
local creatureTypes = {
    "beast",
    "critter",
    "demon",
    "dragonkin",
    "elemental",
    "giant",
    "humanoid",
    "mechanical",
    "totem",
    "undead"
}
function ____exports.isCreatureType(value)
    return __TS__ArrayIncludes(creatureTypes, value)
end
return ____exports
 end,
["dsl.druid-form"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local ____exports = {}
local druidForms = {
    "aquatic",
    "bear",
    "cat",
    "humanoid",
    "moonkin",
    "travel"
}
function ____exports.isDruidForm(value)
    return __TS__ArrayIncludes(druidForms, value)
end
return ____exports
 end,
["dsl.equipment-type"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local ____exports = {}
local equipmentTypes = {"dagger", "meleeWeapon", "shield"}
function ____exports.isEquipmentType(value)
    return __TS__ArrayIncludes(equipmentTypes, value)
end
return ____exports
 end,
["dsl.predicate-registry"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____comparison_2Dfunction = require("dsl.comparison-function")
local ComparisonFunction = ____comparison_2Dfunction.ComparisonFunction
local ____creature_2Dtype = require("dsl.creature-type")
local CreatureType = ____creature_2Dtype.CreatureType
local ____druid_2Dform = require("dsl.druid-form")
local DruidForm = ____druid_2Dform.DruidForm
local ____equipment_2Dtype = require("dsl.equipment-type")
local EquipmentType = ____equipment_2Dtype.EquipmentType
local ____parser = require("dsl.parser")
local Duration = ____parser.Duration
local Percentage = ____parser.Percentage
local Unit = ____parser.Unit
function ____exports.createMockRegistry(overrides)
    local defaultRegistry = {
        pet = {happy = function() return false end},
        player = {
            ammo = function() return false end,
            autoShooting = function() return false end,
            canShiftBackFrom = function() return false end,
            canShiftInto = function() return false end,
            druidForm = function() return false end,
            equipped = function() return false end,
            falling = function() return false end,
            form = function() return false end,
            grouped = function() return false end,
            indoors = function() return false end,
            itemCount = function() return false end,
            meleeAttacking = function() return false end,
            mounted = function() return false end,
            outdoors = function() return false end,
            rageSafe = function() return false end,
            resting = function() return false end,
            running = function() return false end,
            stance = function() return false end,
            stealthed = function() return false end,
            submerged = function() return false end,
            swimming = function() return false end,
            talent = function() return false end,
            usable = function() return false end
        },
        universal = {
            alive = function() return false end,
            attacking = function() return false end,
            bleedable = function() return false end,
            blocked = function() return false end,
            buff = function() return false end,
            casting = function() return false end,
            combat = function() return false end,
            comboPoints = function() return false end,
            creature = function() return false end,
            cursed = function() return false end,
            dead = function() return false end,
            debuff = function() return false end,
            diseased = function() return false end,
            dodged = function() return false end,
            elite = function() return false end,
            energy = function() return false end,
            existing = function() return false end,
            harm = function() return false end,
            health = function() return false end,
            help = function() return false end,
            is = function() return false end,
            level = function() return false end,
            magicBuff = function() return false end,
            magicDebuff = function() return false end,
            mana = function() return false end,
            missing = function() return false end,
            npc = function() return false end,
            ownBuff = function() return false end,
            ownDebuff = function() return false end,
            parried = function() return false end,
            partyMember = function() return false end,
            poisoned = function() return false end,
            rage = function() return false end,
            targeting = function() return false end,
            trivial = function() return false end
        }
    }
    if not overrides then
        return defaultRegistry
    end
    local pet = defaultRegistry.pet
    local player = defaultRegistry.player
    local universal = defaultRegistry.universal
    return {
        pet = overrides.pet and __TS__ObjectAssign({}, pet, overrides.pet) or pet,
        player = overrides.player and __TS__ObjectAssign({}, player, overrides.player) or player,
        universal = overrides.universal and __TS__ObjectAssign({}, universal, overrides.universal) or universal
    }
end
return ____exports
 end,
["dsl.rule-function"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayEvery = ____lualib.__TS__ArrayEvery
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__New = ____lualib.__TS__New
local ____exports = {}
local createPetPredicateFunction, createPlayerPredicateFunction, createUniversalPredicateFunction, assertNoArgs, getRequiredNumericArgument, getOptionalNumericArgument, getRequiredNumberValue, getRequiredStringArgument
local ____comparison_2Dfunction = require("dsl.comparison-function")
local createComparisonFunction = ____comparison_2Dfunction.createComparisonFunction
local ____creature_2Dtype = require("dsl.creature-type")
local isCreatureType = ____creature_2Dtype.isCreatureType
local ____druid_2Dform = require("dsl.druid-form")
local isDruidForm = ____druid_2Dform.isDruidForm
local ____equipment_2Dtype = require("dsl.equipment-type")
local isEquipmentType = ____equipment_2Dtype.isEquipmentType
local ____parser = require("dsl.parser")
local Argument = ____parser.Argument
local Condition = ____parser.Condition
local Predicate = ____parser.Predicate
local Rule = ____parser.Rule
local Unit = ____parser.Unit
local ____predicate_2Dregistry = require("dsl.predicate-registry")
local PetPredicates = ____predicate_2Dregistry.PetPredicates
local PlayerPredicates = ____predicate_2Dregistry.PlayerPredicates
local PredicateRegistry = ____predicate_2Dregistry.PredicateRegistry
local UniversalPredicates = ____predicate_2Dregistry.UniversalPredicates
function ____exports.createConditionFunction(registry, condition, unit)
    repeat
        local ____switch14 = condition.type
        local ____cond14 = ____switch14 == "or"
        if ____cond14 then
            do
                local conditionFunctions = __TS__ArrayMap(
                    condition.conditions,
                    function(____, otherCondition) return ____exports.createConditionFunction(registry, otherCondition, unit) end
                )
                return function(context) return __TS__ArraySome(
                    conditionFunctions,
                    function(____, conditionFunction) return conditionFunction(context) end
                ) end
            end
        end
        ____cond14 = ____cond14 or ____switch14 == "and"
        if ____cond14 then
            do
                local conditionFunctions = __TS__ArrayMap(
                    condition.conditions,
                    function(____, otherCondition) return ____exports.createConditionFunction(registry, otherCondition, unit) end
                )
                return function(context) return __TS__ArrayEvery(
                    conditionFunctions,
                    function(____, conditionFunction) return conditionFunction(context) end
                ) end
            end
        end
        ____cond14 = ____cond14 or ____switch14 == "not"
        if ____cond14 then
            do
                local conditionFunction = ____exports.createConditionFunction(registry, condition.condition, unit)
                return function(context) return not conditionFunction(context) end
            end
        end
        ____cond14 = ____cond14 or ____switch14 == "predicate"
        if ____cond14 then
            do
                return ____exports.createPredicateFunction(registry, condition, unit)
            end
        end
    until true
end
function ____exports.createPredicateFunction(registry, predicate, unit)
    local ____predicate_0 = predicate
    local args = ____predicate_0.args
    local predicateName = ____predicate_0.predicateName
    if predicateName == "always" then
        return function() return true end
    end
    if registry.pet[predicateName] ~= nil then
        if unit.unitId ~= "pet" then
            error(
                __TS__New(Error, ("Predicate '" .. predicateName) .. "' requires @pet unit scope"),
                0
            )
        end
        return createPetPredicateFunction(registry, predicateName, args)
    end
    if registry.player[predicateName] ~= nil then
        if unit.unitId ~= "player" then
            error(
                __TS__New(Error, ("Predicate '" .. predicateName) .. "' requires @player unit scope"),
                0
            )
        end
        return createPlayerPredicateFunction(registry, predicateName, args)
    end
    if registry.universal[predicateName] ~= nil then
        return createUniversalPredicateFunction(registry, predicateName, unit, args)
    end
    error(
        __TS__New(Error, ("Unknown condition: '" .. predicateName) .. "'"),
        0
    )
end
function createPetPredicateFunction(registry, predicateName, args)
    repeat
        local ____switch35 = predicateName
        local ____cond35 = ____switch35 == "happy"
        if ____cond35 then
            do
                assertNoArgs(args, predicateName)
                return function()
                    local ____self_1 = registry.pet
                    return ____self_1[predicateName](____self_1)
                end
            end
        end
    until true
end
function createPlayerPredicateFunction(registry, predicateName, args)
    repeat
        local ____switch39 = predicateName
        local ____cond39 = ____switch39 == "ammo"
        if ____cond39 then
            do
                local amount = getOptionalNumericArgument("number", args[1], predicateName, "amount")
                return function()
                    local ____self_2 = registry.player
                    return ____self_2[predicateName](____self_2, amount)
                end
            end
        end
        ____cond39 = ____cond39 or (____switch39 == "autoShooting" or ____switch39 == "grouped" or ____switch39 == "indoors" or ____switch39 == "meleeAttacking" or ____switch39 == "mounted" or ____switch39 == "outdoors" or ____switch39 == "rageSafe" or ____switch39 == "resting" or ____switch39 == "stealthed" or ____switch39 == "submerged" or ____switch39 == "swimming")
        if ____cond39 then
            do
                assertNoArgs(args, predicateName)
                return function()
                    local ____self_3 = registry.player
                    return ____self_3[predicateName](____self_3)
                end
            end
        end
        ____cond39 = ____cond39 or (____switch39 == "canShiftBackFrom" or ____switch39 == "canShiftInto")
        if ____cond39 then
            do
                local target = getRequiredStringArgument(args[1], predicateName, "target")
                if not isDruidForm(target) then
                    error(
                        __TS__New(Error, ("Predicate '" .. predicateName) .. "' got invalid argument 'target'"),
                        0
                    )
                end
                return function(____bindingPattern0)
                    local actionSlotId
                    actionSlotId = ____bindingPattern0.actionSlotId
                    local ____self_4 = registry.player
                    return ____self_4[predicateName](____self_4, actionSlotId, target)
                end
            end
        end
        ____cond39 = ____cond39 or ____switch39 == "druidForm"
        if ____cond39 then
            do
                local target = getRequiredStringArgument(args[1], predicateName, "target")
                if not isDruidForm(target) then
                    error(
                        __TS__New(Error, ("Predicate '" .. predicateName) .. "' got invalid argument 'target'"),
                        0
                    )
                end
                return function()
                    local ____self_5 = registry.player
                    return ____self_5[predicateName](____self_5, target)
                end
            end
        end
        ____cond39 = ____cond39 or ____switch39 == "usable"
        if ____cond39 then
            do
                local keyword = getRequiredStringArgument(args[1], predicateName, "infer")
                if keyword ~= "infer" then
                    error(
                        __TS__New(Error, ("Predicate '" .. predicateName) .. "' got invalid argument 'infer'"),
                        0
                    )
                end
                return function(____bindingPattern0)
                    local actionSlotId
                    actionSlotId = ____bindingPattern0.actionSlotId
                    local ____self_6 = registry.player
                    return ____self_6[predicateName](____self_6, actionSlotId)
                end
            end
        end
        ____cond39 = ____cond39 or ____switch39 == "equipped"
        if ____cond39 then
            do
                local ____type = getRequiredStringArgument(args[1], predicateName, "type")
                if not isEquipmentType(____type) then
                    error(
                        __TS__New(Error, ("Predicate '" .. predicateName) .. "' got invalid argument 'type'"),
                        0
                    )
                end
                return function()
                    local ____self_7 = registry.player
                    return ____self_7[predicateName](____self_7, ____type)
                end
            end
        end
        ____cond39 = ____cond39 or (____switch39 == "falling" or ____switch39 == "running")
        if ____cond39 then
            do
                local duration = getOptionalNumericArgument("duration", args[1], predicateName, "duration")
                return function()
                    local ____self_8 = registry.player
                    return ____self_8[predicateName](____self_8, duration)
                end
            end
        end
        ____cond39 = ____cond39 or (____switch39 == "form" or ____switch39 == "stance")
        if ____cond39 then
            do
                local number = getRequiredNumericArgument("number", args[1], predicateName, "number")
                return function()
                    local ____self_9 = registry.player
                    return ____self_9[predicateName](____self_9, number)
                end
            end
        end
        ____cond39 = ____cond39 or ____switch39 == "itemCount"
        if ____cond39 then
            do
                local itemId = getRequiredNumberValue(args[1], predicateName, "itemId")
                local amount = getRequiredNumericArgument("number", args[2], predicateName, "amount")
                return function()
                    local ____self_10 = registry.player
                    return ____self_10[predicateName](____self_10, itemId, amount)
                end
            end
        end
        ____cond39 = ____cond39 or ____switch39 == "talent"
        if ____cond39 then
            do
                local talentName = getRequiredStringArgument(args[1], predicateName, "name")
                local rank = getOptionalNumericArgument("number", args[2], predicateName, "rank")
                return function()
                    local ____self_11 = registry.player
                    return ____self_11[predicateName](____self_11, talentName, rank)
                end
            end
        end
    until true
end
function createUniversalPredicateFunction(registry, predicateName, unit, args)
    repeat
        local ____switch65 = predicateName
        local ____cond65 = ____switch65 == "alive" or ____switch65 == "bleedable" or ____switch65 == "blocked" or ____switch65 == "casting" or ____switch65 == "combat" or ____switch65 == "cursed" or ____switch65 == "dead" or ____switch65 == "diseased" or ____switch65 == "dodged" or ____switch65 == "elite" or ____switch65 == "existing" or ____switch65 == "harm" or ____switch65 == "help" or ____switch65 == "magicBuff" or ____switch65 == "magicDebuff" or ____switch65 == "missing" or ____switch65 == "npc" or ____switch65 == "parried" or ____switch65 == "partyMember" or ____switch65 == "poisoned" or ____switch65 == "trivial"
        if ____cond65 then
            do
                assertNoArgs(args, predicateName)
                return function()
                    local ____self_12 = registry.universal
                    return ____self_12[predicateName](____self_12, unit)
                end
            end
        end
        ____cond65 = ____cond65 or (____switch65 == "attacking" or ____switch65 == "is" or ____switch65 == "targeting")
        if ____cond65 then
            do
                local targetUnitId = getRequiredStringArgument(args[1], predicateName, "@unit")
                return function()
                    local ____self_13 = registry.universal
                    return ____self_13[predicateName](____self_13, unit, targetUnitId)
                end
            end
        end
        ____cond65 = ____cond65 or (____switch65 == "buff" or ____switch65 == "debuff" or ____switch65 == "ownBuff" or ____switch65 == "ownDebuff")
        if ____cond65 then
            do
                local auraName = getRequiredStringArgument(args[1], predicateName, "name")
                local count = getOptionalNumericArgument("number", args[2], predicateName, "count")
                local duration = getOptionalNumericArgument("duration", args[3], predicateName, "duration")
                return function(context)
                    local ____context_14 = context
                    local spellName = ____context_14.spellName
                    if auraName == "infer" and spellName == nil then
                        return false
                    end
                    local ____self_15 = registry.universal
                    return ____self_15[predicateName](
                        ____self_15,
                        unit,
                        auraName == "infer" and context.spellName or auraName,
                        count,
                        duration
                    )
                end
            end
        end
        ____cond65 = ____cond65 or ____switch65 == "comboPoints"
        if ____cond65 then
            do
                local number = getRequiredNumericArgument("number", args[1], predicateName, "number")
                return function()
                    local ____self_16 = registry.universal
                    return ____self_16[predicateName](____self_16, unit, number)
                end
            end
        end
        ____cond65 = ____cond65 or ____switch65 == "creature"
        if ____cond65 then
            do
                local ____type = getRequiredStringArgument(args[1], predicateName, "type")
                if not isCreatureType(____type) then
                    error(
                        __TS__New(Error, ("Predicate '" .. predicateName) .. "' got invalid argument 'type'"),
                        0
                    )
                end
                return function()
                    local ____self_17 = registry.universal
                    return ____self_17[predicateName](____self_17, unit, ____type)
                end
            end
        end
        ____cond65 = ____cond65 or (____switch65 == "energy" or ____switch65 == "rage")
        if ____cond65 then
            do
                local amount = getRequiredNumericArgument("number", args[1], predicateName, "amount")
                return function()
                    local ____self_18 = registry.universal
                    return ____self_18[predicateName](____self_18, unit, amount)
                end
            end
        end
        ____cond65 = ____cond65 or (____switch65 == "health" or ____switch65 == "mana")
        if ____cond65 then
            do
                local percentage = getRequiredNumericArgument("percentage", args[1], predicateName, "percentage")
                return function()
                    local ____self_19 = registry.universal
                    return ____self_19[predicateName](____self_19, unit, percentage)
                end
            end
        end
        ____cond65 = ____cond65 or ____switch65 == "level"
        if ____cond65 then
            do
                local level = getRequiredNumericArgument("number", args[1], predicateName, "level")
                return function()
                    local ____self_20 = registry.universal
                    return ____self_20[predicateName](____self_20, unit, level)
                end
            end
        end
    until true
end
function assertNoArgs(args, predicateName)
    if #args > 0 then
        error(
            __TS__New(Error, ("Predicate '" .. predicateName) .. "' takes no arguments"),
            0
        )
    end
end
function getRequiredNumericArgument(expectedType, value, predicateName, argName)
    local ____temp_22
    if value == nil or type(value) == "string" then
        ____temp_22 = nil
    else
        local ____temp_21
        if type(value) == "table" and value.type == "comparison" then
            ____temp_21 = createComparisonFunction(expectedType, value.operator, value.threshold)
        else
            ____temp_21 = createComparisonFunction(expectedType, "==", value)
        end
        ____temp_22 = ____temp_21
    end
    local comparisonFunction = ____temp_22
    if not comparisonFunction then
        error(
            __TS__New(Error, ((("Predicate '" .. predicateName) .. "' got invalid argument '") .. argName) .. "'"),
            0
        )
    end
    return comparisonFunction
end
function getOptionalNumericArgument(expectedType, value, predicateName, argName)
    return value ~= nil and getRequiredNumericArgument(expectedType, value, predicateName, argName) or nil
end
function getRequiredNumberValue(value, predicateName, argName)
    if type(value) == "number" then
        return value
    end
    error(
        __TS__New(Error, ((("Predicate '" .. predicateName) .. "' got invalid argument '") .. argName) .. "'"),
        0
    )
end
function getRequiredStringArgument(value, predicateName, argName)
    if type(value) == "string" then
        return value
    end
    error(
        __TS__New(Error, ((("Predicate '" .. predicateName) .. "' got invalid argument '") .. argName) .. "'"),
        0
    )
end
function ____exports.createRuleFunction(registry, rule)
    repeat
        local ____switch3 = rule.type
        local ____cond3 = ____switch3 == "or"
        if ____cond3 then
            do
                local ruleFunctions = __TS__ArrayMap(
                    rule.rules,
                    function(____, otherRule) return ____exports.createRuleFunction(registry, otherRule) end
                )
                return function(context) return __TS__ArraySome(
                    ruleFunctions,
                    function(____, ruleFunction) return ruleFunction(context) end
                ) end
            end
        end
        ____cond3 = ____cond3 or ____switch3 == "and"
        if ____cond3 then
            do
                local ruleFunctions = __TS__ArrayMap(
                    rule.rules,
                    function(____, otherRule) return ____exports.createRuleFunction(registry, otherRule) end
                )
                return function(context) return __TS__ArrayEvery(
                    ruleFunctions,
                    function(____, ruleFunction) return ruleFunction(context) end
                ) end
            end
        end
        ____cond3 = ____cond3 or ____switch3 == "scope"
        if ____cond3 then
            do
                return ____exports.createConditionFunction(registry, rule.condition, rule.unit)
            end
        end
    until true
end
return ____exports
 end,
["dsl.button-behavior"] = function(...) 
local ____lualib = require("lualib_bundle")
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local ____exports = {}
local createButtonBehavior
local ____parser = require("dsl.parser")
local Configuration = ____parser.Configuration
local VisualStates = ____parser.VisualStates
local ____predicate_2Dregistry = require("dsl.predicate-registry")
local PredicateRegistry = ____predicate_2Dregistry.PredicateRegistry
local ____rule_2Dfunction = require("dsl.rule-function")
local RuleFunction = ____rule_2Dfunction.RuleFunction
local ____rule_2Dfunction = require("dsl.rule-function")
local createRuleFunction = ____rule_2Dfunction.createRuleFunction
function createButtonBehavior(registry, ____bindingPattern0)
    local glowing
    local flashing
    local enabled
    local depleted
    local checked
    local blocked
    blocked = ____bindingPattern0.blocked
    checked = ____bindingPattern0.checked
    depleted = ____bindingPattern0.depleted
    enabled = ____bindingPattern0.enabled
    flashing = ____bindingPattern0.flashing
    glowing = ____bindingPattern0.glowing
    return {
        blocked = blocked and createRuleFunction(registry, blocked),
        checked = checked and createRuleFunction(registry, checked),
        depleted = depleted and createRuleFunction(registry, depleted),
        enabled = enabled and createRuleFunction(registry, enabled),
        flashing = flashing and createRuleFunction(registry, flashing),
        glowing = glowing and createRuleFunction(registry, glowing)
    }
end
function ____exports.createButtonBehaviors(registry, ...)
    local configurations = {...}
    local map = __TS__New(Map)
    for ____, configuration in ipairs(configurations) do
        local buttonBehavior = createButtonBehavior(registry, configuration.visualStates)
        if configuration.type == "item" then
            for ____, itemId in ipairs(configuration.itemIds) do
                if map:has(itemId) then
                    error(
                        __TS__New(
                            Error,
                            "Duplicate item declaration: " .. tostring(itemId)
                        ),
                        0
                    )
                end
                map:set(itemId, buttonBehavior)
            end
        else
            if map:has(configuration.spellName) then
                error(
                    __TS__New(Error, ("Duplicate spell declaration: '" .. configuration.spellName) .. "'"),
                    0
                )
            end
            map:set(configuration.spellName, buttonBehavior)
        end
    end
    return map
end
return ____exports
 end,
["core.action"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local getAction, getActionSlotId
function getAction(button)
    local actionSlotId = getActionSlotId(button)
    if actionSlotId ~= nil then
        local actionType, actionId = GetActionInfo(actionSlotId)
        if actionType == "item" then
            local itemSpellName, itemSpellId = GetItemSpell(actionId)
            return {
                actionSlotId = actionSlotId,
                button = button,
                itemId = actionId,
                itemSpellId = itemSpellId,
                itemSpellName = itemSpellName,
                type = "item"
            }
        end
        if actionType == "macro" then
            local spellId = GetMacroSpell(actionId)
            if spellId ~= nil then
                local spellName = GetSpellInfo(spellId)
                if spellName ~= nil then
                    return {
                        actionSlotId = actionSlotId,
                        button = button,
                        spellId = spellId,
                        spellName = spellName,
                        type = "spell"
                    }
                end
            else
                local itemName = GetMacroItem(actionId)
                if itemName ~= nil then
                    local itemId = GetItemInfoInstant(itemName)
                    if itemId ~= nil then
                        local itemSpellName, itemSpellId = GetItemSpell(itemName)
                        return {
                            actionSlotId = actionSlotId,
                            button = button,
                            itemId = itemId,
                            itemSpellId = itemSpellId,
                            itemSpellName = itemSpellName,
                            type = "item"
                        }
                    end
                end
            end
        elseif actionType == "spell" then
            local spellName = GetSpellInfo(actionId)
            if spellName ~= nil then
                return {
                    actionSlotId = actionSlotId,
                    button = button,
                    spellId = actionId,
                    spellName = spellName,
                    type = "spell"
                }
            end
        end
    end
    return
end
function getActionSlotId(button)
    local actionSlotId = button._state_action ~= nil and type(button._state_action) == "number" and button._state_action or ActionButton_GetPagedID(button)
    return actionSlotId ~= nil and actionSlotId > 0 and actionSlotId or nil
end
local global = _G
local cache
function ____exports.getActions()
    if (cache and cache.time) == GetTime() then
        return cache.actions
    end
    local buttons = {}
    do
        local index = 1
        while index <= 12 do
            buttons[#buttons + 1] = global["ActionButton" .. tostring(index)]
            buttons[#buttons + 1] = global["MultiBarRightButton" .. tostring(index)]
            buttons[#buttons + 1] = global["MultiBarLeftButton" .. tostring(index)]
            buttons[#buttons + 1] = global["MultiBarBottomRightButton" .. tostring(index)]
            buttons[#buttons + 1] = global["MultiBarBottomLeftButton" .. tostring(index)]
            buttons[#buttons + 1] = global["BT4Button" .. tostring(index)]
            buttons[#buttons + 1] = global["BT4Button" .. tostring(index + 12)]
            buttons[#buttons + 1] = global["BT4Button" .. tostring(index + 24)]
            buttons[#buttons + 1] = global["BT4Button" .. tostring(index + 36)]
            buttons[#buttons + 1] = global["BT4Button" .. tostring(index + 48)]
            buttons[#buttons + 1] = global["BT4Button" .. tostring(index + 60)]
            buttons[#buttons + 1] = global["BT4Button" .. tostring(index + 72)]
            buttons[#buttons + 1] = global["BT4Button" .. tostring(index + 84)]
            buttons[#buttons + 1] = global["BT4Button" .. tostring(index + 96)]
            buttons[#buttons + 1] = global["BT4Button" .. tostring(index + 108)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 12)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 24)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 36)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 48)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 60)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 72)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 84)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 96)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 108)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 120)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 132)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 144)]
            buttons[#buttons + 1] = global["DominosActionButton" .. tostring(index + 156)]
            index = index + 1
        end
    end
    local actions = {}
    for ____, button in ipairs(buttons) do
        if button and button:IsVisible() then
            local action = getAction(button)
            if action then
                actions[#actions + 1] = action
            end
        end
    end
    cache = {
        actions = actions,
        time = GetTime()
    }
    return actions
end
return ____exports
 end,
["core.custom-button-state"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____button_2Dbehavior = require("dsl.button-behavior")
local ButtonBehaviorMap = ____button_2Dbehavior.ButtonBehaviorMap
local ____rule_2Dfunction = require("dsl.rule-function")
local RuleFunctionContext = ____rule_2Dfunction.RuleFunctionContext
local ____action = require("core.action")
local Action = ____action.Action
function ____exports.createCustomButtonState(buttonBehaviors, action)
    local ____action_0 = action
    local actionSlotId = ____action_0.actionSlotId
    local buttonBehavior = buttonBehaviors:get(action.type == "spell" and action.spellName or action.itemId)
    if not buttonBehavior then
        return
    end
    local ____actionSlotId_2 = actionSlotId
    local ____temp_1
    if action.type == "item" then
        ____temp_1 = action.itemSpellName
    else
        ____temp_1 = action.spellName
    end
    local context = {actionSlotId = ____actionSlotId_2, spellName = ____temp_1}
    local ____opt_3 = buttonBehavior.blocked
    local ____temp_5 = ____opt_3 and ____opt_3(context)
    if ____temp_5 == nil then
        ____temp_5 = false
    end
    local ____opt_6 = buttonBehavior.checked
    local ____temp_8 = ____opt_6 and ____opt_6(context)
    if ____temp_8 == nil then
        ____temp_8 = false
    end
    local ____opt_9 = buttonBehavior.depleted
    local ____temp_11 = ____opt_9 and ____opt_9(context)
    if ____temp_11 == nil then
        ____temp_11 = false
    end
    local ____opt_12 = buttonBehavior.enabled
    local ____temp_14 = ____opt_12 and ____opt_12(context)
    if ____temp_14 == nil then
        ____temp_14 = true
    end
    local ____opt_15 = buttonBehavior.flashing
    local ____temp_17 = ____opt_15 and ____opt_15(context)
    if ____temp_17 == nil then
        ____temp_17 = false
    end
    local ____opt_18 = buttonBehavior.glowing
    local ____temp_20 = ____opt_18 and ____opt_18(context)
    if ____temp_20 == nil then
        ____temp_20 = false
    end
    return {
        blocked = ____temp_5,
        checked = ____temp_8,
        depleted = ____temp_11,
        enabled = ____temp_14,
        flashing = ____temp_17,
        glowing = ____temp_20
    }
end
return ____exports
 end,
["core.default-button-state"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local hasEnoughPower
local ____action = require("core.action")
local Action = ____action.Action
function hasEnoughPower(action)
    if action.type == "item" then
        return true
    end
    local costs = GetSpellPowerCost(action.spellId)
    if costs then
        for ____, cost in ipairs(costs) do
            local currentPower = UnitPower("player", cost.type)
            if currentPower < cost.minCost then
                return false
            end
        end
    end
    return true
end
local globalCooldownThreshold = 1.5
function ____exports.createDefaultButtonState(action)
    local ____action_0 = action
    local actionSlotId = ____action_0.actionSlotId
    local ____, cooldownDuration = GetActionCooldown(actionSlotId)
    local defaultButtonState = {
        blocked = UnitOnTaxi("player") or ActionHasRange(actionSlotId) and IsActionInRange(actionSlotId) == false,
        checked = IsCurrentAction(actionSlotId) or IsAutoRepeatAction(actionSlotId),
        depleted = false,
        enabled = cooldownDuration <= globalCooldownThreshold
    }
    if not defaultButtonState.checked then
        if action.type == "spell" then
            defaultButtonState.checked = IsCurrentSpell(action.spellId)
        elseif action.itemSpellId ~= nil then
            defaultButtonState.checked = IsCurrentSpell(action.itemSpellId)
        end
    end
    if IsConsumableAction(actionSlotId) then
        defaultButtonState.depleted = GetActionCount(actionSlotId) == 0
    end
    if not defaultButtonState.depleted then
        defaultButtonState.depleted = not hasEnoughPower(action)
    end
    return defaultButtonState
end
return ____exports
 end,
["core.button-appearance"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____button_2Dbehavior = require("dsl.button-behavior")
local ButtonBehaviorMap = ____button_2Dbehavior.ButtonBehaviorMap
local ____action = require("core.action")
local Action = ____action.Action
local ____custom_2Dbutton_2Dstate = require("core.custom-button-state")
local createCustomButtonState = ____custom_2Dbutton_2Dstate.createCustomButtonState
local ____default_2Dbutton_2Dstate = require("core.default-button-state")
local createDefaultButtonState = ____default_2Dbutton_2Dstate.createDefaultButtonState
function ____exports.createButtonAppearance(buttonBehaviors, action)
    local defaultButtonState = createDefaultButtonState(action)
    local customButtonState = createCustomButtonState(buttonBehaviors, action)
    local ____temp_2 = defaultButtonState.blocked or customButtonState and customButtonState.blocked
    if ____temp_2 == nil then
        ____temp_2 = false
    end
    local blocked = ____temp_2
    local ____temp_5 = defaultButtonState.depleted or customButtonState and customButtonState.depleted
    if ____temp_5 == nil then
        ____temp_5 = false
    end
    local depleted = ____temp_5
    local ____temp_8 = defaultButtonState.checked or customButtonState and customButtonState.checked
    if ____temp_8 == nil then
        ____temp_8 = false
    end
    local checked = ____temp_8
    if blocked or depleted or checked or not defaultButtonState.enabled then
        return {checked = checked, color = blocked and depleted and "violet" or (blocked and "red" or (depleted and "blue" or nil)), enabled = false}
    end
    if not customButtonState then
        return {effect = nil, enabled = true}
    end
    if not customButtonState.enabled then
        return {checked = false, color = nil, enabled = false}
    end
    return {effect = customButtonState.flashing and "flashing" or (customButtonState.glowing and "glowing" or nil), enabled = true}
end
return ____exports
 end,
["core.pet-predicates"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____predicate_2Dregistry = require("dsl.predicate-registry")
local PetPredicates = ____predicate_2Dregistry.PetPredicates
____exports.petPredicates = {happy = function(self)
    local happiness = GetPetHappiness()
    return happiness ~= nil and happiness >= 3
end}
return ____exports
 end,
["utils.get-druid-form-index"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local ____exports = {}
local ____druid_2Dform = require("dsl.druid-form")
local DruidForm = ____druid_2Dform.DruidForm
local spellIdsByDruidForm = {
    aquatic = {1066},
    bear = {5487, 9634},
    cat = {768},
    humanoid = {},
    moonkin = {24858},
    travel = {783}
}
function ____exports.getDruidFormIndex(druidForm)
    local spellIds = spellIdsByDruidForm[druidForm]
    if #spellIds == 0 then
        return 0
    end
    do
        local index = 1
        while index <= GetNumShapeshiftForms() do
            local ____, ____, ____, spellId = GetShapeshiftFormInfo(index)
            if __TS__ArrayIncludes(spellIds, spellId) then
                return index
            end
            index = index + 1
        end
    end
    return
end
return ____exports
 end,
["utils.get-spell-mana-cost"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.getSpellManaCost(spellId)
    local costs = GetSpellPowerCost(spellId)
    if costs then
        for ____, cost in ipairs(costs) do
            if cost.type == Enum.PowerType.Mana then
                return cost.minCost
            end
        end
    end
    return 0
end
return ____exports
 end,
["utils.get-druid-form-mana-cost"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____get_2Dspell_2Dmana_2Dcost = require("utils.get-spell-mana-cost")
local getSpellManaCost = ____get_2Dspell_2Dmana_2Dcost.getSpellManaCost
function ____exports.getDruidFormManaCost(index)
    if index == 0 then
        return 0
    end
    local ____, ____, ____, spellId = GetShapeshiftFormInfo(index)
    return getSpellManaCost(spellId)
end
return ____exports
 end,
["utils.get-falling-duration"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local fallingStartTime
function ____exports.getFallingDuration()
    if IsFalling() then
        if fallingStartTime == nil then
            fallingStartTime = GetTime()
        end
        return GetTime() - fallingStartTime
    end
    fallingStartTime = nil
    return 0
end
return ____exports
 end,
["utils.is-running"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.isRunning()
    if IsMounted() or UnitOnTaxi("player") then
        return false
    end
    return GetUnitSpeed("player") >= 7
end
return ____exports
 end,
["utils.get-running-duration"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____is_2Drunning = require("utils.is-running")
local isRunning = ____is_2Drunning.isRunning
local runningStartTime
function ____exports.getRunningDuration()
    if isRunning() then
        if runningStartTime == nil then
            runningStartTime = GetTime()
        end
        return GetTime() - runningStartTime
    end
    runningStartTime = nil
    return 0
end
return ____exports
 end,
["utils.get-talent-rank"] = function(...) 
local ____lualib = require("lualib_bundle")
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__New = ____lualib.__TS__New
local ____exports = {}
function ____exports.getTalentRank(talentName)
    repeat
        local ____switch3 = talentName
        local ____cond3 = ____switch3 == "Improved Mend Pet"
        if ____cond3 then
            do
                local ____, iconTexture, ____, ____, rank = GetTalentInfo(1, 4)
                if iconTexture ~= 132179 then
                    error(
                        __TS__New(Error, ("Unable to detect talent: '" .. talentName) .. "'"),
                        0
                    )
                end
                return rank
            end
        end
        ____cond3 = ____cond3 or ____switch3 == "Improved Overpower"
        if ____cond3 then
            do
                local ____, iconTexture, ____, ____, rank = GetTalentInfo(1, 10)
                if iconTexture ~= 135275 then
                    error(
                        __TS__New(Error, ("Unable to detect talent: '" .. talentName) .. "'"),
                        0
                    )
                end
                return rank
            end
        end
        ____cond3 = ____cond3 or ____switch3 == "Tactical Mastery"
        if ____cond3 then
            do
                local ____, iconTexture, ____, ____, rank = GetTalentInfo(1, 17)
                if iconTexture ~= 136031 then
                    error(
                        __TS__New(Error, ("Unable to detect talent: '" .. talentName) .. "'"),
                        0
                    )
                end
                return rank
            end
        end
    until true
end
return ____exports
 end,
["core.aura-state"] = function(...) 
local ____lualib = require("lualib_bundle")
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local ____exports = {}
local cache = __TS__New(Map)
function ____exports.getAuraState(unitId)
    local cacheEntry = cache:get(unitId)
    if (cacheEntry and cacheEntry.time) == GetTime() then
        return cacheEntry.auraState
    end
    local buffs = __TS__New(Map)
    local debuffs = __TS__New(Map)
    local ownBuffs = __TS__New(Map)
    local ownDebuffs = __TS__New(Map)
    local hasMagicBuff = false
    local hasMagicDebuff = false
    local isCursed = false
    local isDiseased = false
    local isPoisoned = false
    for ____, filter in ipairs({"HARMFUL", "HELPFUL"}) do
        local index = 1
        while true do
            local auraName, ____, count, dispelType, ____, expirationTime, source, ____, ____, spellId = UnitAura(unitId, index, filter)
            local aura = {
                count = count == 0 and 1 or count,
                remainingTime = expirationTime ~= nil and expirationTime - GetTime() or math.huge
            }
            if not auraName then
                break
            end
            if filter == "HARMFUL" then
                debuffs:set(auraName, aura)
                debuffs:set(spellId, aura)
                if source == "player" then
                    ownDebuffs:set(auraName, aura)
                    ownDebuffs:set(spellId, aura)
                end
                repeat
                    local ____switch9 = dispelType
                    local ____cond9 = ____switch9 == "Curse"
                    if ____cond9 then
                        do
                            isCursed = true
                            break
                        end
                    end
                    ____cond9 = ____cond9 or ____switch9 == "Disease"
                    if ____cond9 then
                        do
                            isDiseased = true
                            break
                        end
                    end
                    ____cond9 = ____cond9 or ____switch9 == "Magic"
                    if ____cond9 then
                        do
                            hasMagicDebuff = true
                            break
                        end
                    end
                    ____cond9 = ____cond9 or ____switch9 == "Poison"
                    if ____cond9 then
                        do
                            isPoisoned = true
                            break
                        end
                    end
                until true
            else
                buffs:set(auraName, aura)
                buffs:set(spellId, aura)
                if source == "player" then
                    ownBuffs:set(auraName, aura)
                    ownBuffs:set(spellId, aura)
                end
                if dispelType == "Magic" then
                    hasMagicBuff = true
                end
            end
            index = index + 1
        end
    end
    local auraState = {
        buffs = buffs,
        debuffs = debuffs,
        hasMagicBuff = hasMagicBuff,
        hasMagicDebuff = hasMagicDebuff,
        isCursed = isCursed,
        isDiseased = isDiseased,
        isPoisoned = isPoisoned,
        ownBuffs = ownBuffs,
        ownDebuffs = ownDebuffs
    }
    cache:set(
        unitId,
        {
            auraState = auraState,
            time = GetTime()
        }
    )
    return auraState
end
return ____exports
 end,
["core.player-predicates"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____predicate_2Dregistry = require("dsl.predicate-registry")
local PlayerPredicates = ____predicate_2Dregistry.PlayerPredicates
local ____get_2Ddruid_2Dform_2Dindex = require("utils.get-druid-form-index")
local getDruidFormIndex = ____get_2Ddruid_2Dform_2Dindex.getDruidFormIndex
local ____get_2Ddruid_2Dform_2Dmana_2Dcost = require("utils.get-druid-form-mana-cost")
local getDruidFormManaCost = ____get_2Ddruid_2Dform_2Dmana_2Dcost.getDruidFormManaCost
local ____get_2Dfalling_2Dduration = require("utils.get-falling-duration")
local getFallingDuration = ____get_2Dfalling_2Dduration.getFallingDuration
local ____get_2Drunning_2Dduration = require("utils.get-running-duration")
local getRunningDuration = ____get_2Drunning_2Dduration.getRunningDuration
local ____get_2Dspell_2Dmana_2Dcost = require("utils.get-spell-mana-cost")
local getSpellManaCost = ____get_2Dspell_2Dmana_2Dcost.getSpellManaCost
local ____get_2Dtalent_2Drank = require("utils.get-talent-rank")
local getTalentRank = ____get_2Dtalent_2Drank.getTalentRank
local ____is_2Drunning = require("utils.is-running")
local isRunning = ____is_2Drunning.isRunning
local ____aura_2Dstate = require("core.aura-state")
local getAuraState = ____aura_2Dstate.getAuraState
____exports.playerPredicates = {
    ammo = function(self, amount)
        local ammoItemId = GetInventoryItemID("player", 0)
        local ammoCount = ammoItemId ~= nil and GetItemCount(ammoItemId) or 0
        local ____temp_2 = amount and amount(ammoCount)
        if ____temp_2 == nil then
            ____temp_2 = ammoCount > 0
        end
        return ____temp_2
    end,
    autoShooting = function(self)
        return IsAutoRepeatSpell(75)
    end,
    canShiftBackFrom = function(self, actionSlotId, target)
        local targetIndex = getDruidFormIndex(target)
        if targetIndex == nil then
            return false
        end
        local currentIndex = GetShapeshiftForm()
        local currentMana = UnitPower("player", Enum.PowerType.Mana)
        local actionManaCost = 0
        local actionType, actionId = GetActionInfo(actionSlotId)
        if actionType == "spell" then
            actionManaCost = getSpellManaCost(actionId)
        elseif actionType == "macro" then
            local spellId = GetMacroSpell(actionId)
            if spellId ~= nil then
                actionManaCost = getSpellManaCost(spellId)
            end
        end
        if currentIndex == targetIndex then
            return currentMana >= actionManaCost
        end
        local roundTripManaCost = getDruidFormManaCost(targetIndex) + actionManaCost + getDruidFormManaCost(currentIndex)
        return currentMana >= roundTripManaCost
    end,
    canShiftInto = function(self, actionSlotId, target)
        local targetIndex = getDruidFormIndex(target)
        if targetIndex == nil then
            return false
        end
        local currentIndex = GetShapeshiftForm()
        local currentMana = UnitPower("player", Enum.PowerType.Mana)
        local actionManaCost = 0
        local actionType, actionId = GetActionInfo(actionSlotId)
        if actionType == "spell" then
            actionManaCost = getSpellManaCost(actionId)
        elseif actionType == "macro" then
            local spellId = GetMacroSpell(actionId)
            if spellId ~= nil then
                actionManaCost = getSpellManaCost(spellId)
            end
        end
        if currentIndex == targetIndex then
            return currentMana >= actionManaCost
        end
        local oneWayManaCost = getDruidFormManaCost(targetIndex) + actionManaCost
        return currentMana >= oneWayManaCost
    end,
    druidForm = function(self, target)
        local targetIndex = getDruidFormIndex(target)
        if targetIndex == nil then
            return false
        end
        return GetShapeshiftForm() == targetIndex
    end,
    equipped = function(self, ____type)
        if ____type == "meleeWeapon" then
            local mainHandItemId = GetInventoryItemID("player", 16)
            if mainHandItemId == nil then
                return false
            end
            local ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, classId = GetItemInfo(mainHandItemId)
            if classId ~= 2 then
                return false
            end
            local auraState = getAuraState("player")
            local isDiarmed = auraState.debuffs:has(676) or auraState.debuffs:has(6713) or auraState.debuffs:has(8379) or auraState.debuffs:has(22691) or auraState.debuffs:has(27581)
            return not isDiarmed
        end
        return IsEquippedItemType(____type)
    end,
    falling = function(self, duration)
        local ____duration_3
        if duration then
            ____duration_3 = duration({
                type = "duration",
                value = getFallingDuration()
            })
        else
            ____duration_3 = IsFalling()
        end
        return ____duration_3
    end,
    form = function(self, number)
        return number(GetShapeshiftForm())
    end,
    grouped = function(self)
        return IsInGroup()
    end,
    indoors = function(self)
        return IsIndoors()
    end,
    itemCount = function(self, itemId, amount)
        return amount(GetItemCount(itemId))
    end,
    meleeAttacking = function(self)
        return IsCurrentSpell(6603)
    end,
    mounted = function(self)
        return IsMounted()
    end,
    outdoors = function(self)
        return IsOutdoors()
    end,
    rageSafe = function(self)
        local rank = getTalentRank("Tactical Mastery")
        local rage = UnitPower("player", Enum.PowerType.Rage)
        return rage <= rank * 5
    end,
    resting = function(self)
        return IsResting()
    end,
    running = function(self, duration)
        local ____duration_4
        if duration then
            ____duration_4 = duration({
                type = "duration",
                value = getRunningDuration()
            })
        else
            ____duration_4 = isRunning()
        end
        return ____duration_4
    end,
    stance = function(self, number)
        return number(GetShapeshiftForm())
    end,
    stealthed = function(self)
        return IsStealthed()
    end,
    submerged = function(self)
        return IsSubmerged()
    end,
    swimming = function(self)
        return IsSwimming()
    end,
    talent = function(self, talentName, rank)
        if talentName ~= "Improved Mend Pet" and talentName ~= "Improved Overpower" and talentName ~= "Tactical Mastery" then
            return false
        end
        local currentRank = getTalentRank(talentName)
        local ____temp_7 = rank and rank(currentRank)
        if ____temp_7 == nil then
            ____temp_7 = currentRank > 0
        end
        return ____temp_7
    end,
    usable = function(self, actionSlotId)
        local isUsable = IsUsableAction(actionSlotId)
        return isUsable
    end
}
return ____exports
 end,
["utils.get-percentage"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.getPercentage(value, maxValue)
    return maxValue == 0 and 0 or math.ceil(value / maxValue * 100)
end
return ____exports
 end,
["utils.has-missed"] = function(...) 
local ____lualib = require("lualib_bundle")
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local ____exports = {}
local blockTimestampByUnitGuids = __TS__New(Map)
local dodgeTimestampByUnitGuids = __TS__New(Map)
local parryTimestampByUnitGuids = __TS__New(Map)
function ____exports.hasMissed(unitId, missType)
    local unitGuid = UnitGUID(unitId)
    if unitGuid == nil then
        return false
    end
    local timestampByUnitGuids = missType == "block" and blockTimestampByUnitGuids or (missType == "dodge" and dodgeTimestampByUnitGuids or parryTimestampByUnitGuids)
    local timestamp = timestampByUnitGuids:get(unitGuid)
    return timestamp ~= nil and GetTime() - timestamp < 5
end
local frame = CreateFrame("Frame")
frame:RegisterEvent("COMBAT_LOG_EVENT_UNFILTERED")
frame:RegisterEvent("PLAYER_REGEN_ENABLED")
frame:SetScript(
    "OnEvent",
    function(____, event)
        if event == "PLAYER_REGEN_ENABLED" then
            blockTimestampByUnitGuids:clear()
            dodgeTimestampByUnitGuids:clear()
            parryTimestampByUnitGuids:clear()
            return
        end
        local ____, eventType, ____, sourceGUID, ____, ____, ____, targetGUID, ____, ____, ____, missType = CombatLogGetCurrentEventInfo()
        if eventType ~= "SWING_MISSED" then
            return
        end
        local playerGUID = UnitGUID("player")
        if (sourceGUID == playerGUID or targetGUID == playerGUID) and type(targetGUID) == "string" then
            if missType == "BLOCK" then
                blockTimestampByUnitGuids:set(
                    targetGUID,
                    GetTime()
                )
            elseif missType == "DODGE" then
                dodgeTimestampByUnitGuids:set(
                    targetGUID,
                    GetTime()
                )
            elseif missType == "PARRY" then
                parryTimestampByUnitGuids:set(
                    targetGUID,
                    GetTime()
                )
            end
        end
    end
)
return ____exports
 end,
["utils.is-spellcasting"] = function(...) 
local ____lualib = require("lualib_bundle")
local Set = ____lualib.Set
local __TS__New = ____lualib.__TS__New
local ____exports = {}
local unitGuids = __TS__New(Set)
function ____exports.isSpellcasting(unitId)
    local unitGuid = UnitGUID(unitId)
    return unitGuid ~= nil and unitGuids:has(unitGuid)
end
local frame = CreateFrame("Frame")
frame:RegisterEvent("PLAYER_REGEN_ENABLED")
frame:RegisterEvent("UNIT_SPELLCAST_FAILED")
frame:RegisterEvent("UNIT_SPELLCAST_FAILED_QUIET")
frame:RegisterEvent("UNIT_SPELLCAST_INTERRUPTED")
frame:RegisterEvent("UNIT_SPELLCAST_START")
frame:RegisterEvent("UNIT_SPELLCAST_STOP")
frame:RegisterEvent("UNIT_SPELLCAST_SUCCEEDED")
frame:SetScript(
    "OnEvent",
    function(____, event, ...)
        local args = {...}
        if event == "PLAYER_REGEN_ENABLED" then
            unitGuids:clear()
            return
        end
        local unitId = unpack(args, 1, 1)
        local ____temp_0
        if unitId ~= nil then
            ____temp_0 = UnitGUID(unitId)
        else
            ____temp_0 = nil
        end
        local unitGuid = ____temp_0
        if unitGuid then
            if event == "UNIT_SPELLCAST_START" then
                unitGuids:add(unitGuid)
            else
                unitGuids:delete(unitGuid)
            end
        end
    end
)
return ____exports
 end,
["utils.resolve-unit-id"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____parser = require("dsl.parser")
local Unit = ____parser.Unit
function ____exports.resolveUnitId(unit)
    local ____unit_0 = unit
    local modifier = ____unit_0.modifier
    local unitId = ____unit_0.unitId
    if modifier == "help" then
        return (IsModifiedClick("SELFCAST") or not UnitExists(unitId) or not UnitCanAssist("player", unitId)) and "player" or unitId
    end
    return unitId
end
return ____exports
 end,
["core.universal-predicates"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____predicate_2Dregistry = require("dsl.predicate-registry")
local UniversalPredicates = ____predicate_2Dregistry.UniversalPredicates
local ____get_2Dpercentage = require("utils.get-percentage")
local getPercentage = ____get_2Dpercentage.getPercentage
local ____has_2Dmissed = require("utils.has-missed")
local hasMissed = ____has_2Dmissed.hasMissed
local ____is_2Dspellcasting = require("utils.is-spellcasting")
local isSpellcasting = ____is_2Dspellcasting.isSpellcasting
local ____resolve_2Dunit_2Did = require("utils.resolve-unit-id")
local resolveUnitId = ____resolve_2Dunit_2Did.resolveUnitId
local ____aura_2Dstate = require("core.aura-state")
local getAuraState = ____aura_2Dstate.getAuraState
____exports.universalPredicates = {
    alive = function(self, unit)
        local unitId = resolveUnitId(unit)
        return UnitExists(unitId) and not UnitIsDeadOrGhost(unitId)
    end,
    attacking = function(self, unit, targetUnitId)
        local unitId = resolveUnitId(unit)
        return UnitExists(unitId .. "target") and UnitIsUnit(unitId .. "target", targetUnitId)
    end,
    bleedable = function(self, unit)
        local unitId = resolveUnitId(unit)
        local creatureType = UnitCreatureType(unitId)
        if creatureType == nil then
            return false
        end
        repeat
            local ____switch6 = creatureType
            local ____cond6 = ____switch6 == "Elemental" or ____switch6 == "Mechanical" or ____switch6 == "Undead"
            if ____cond6 then
                do
                    return false
                end
            end
        until true
        return true
    end,
    blocked = function(self, unit)
        return hasMissed(
            resolveUnitId(unit),
            "block"
        )
    end,
    buff = function(self, unit, auraName, count, duration)
        local aura = getAuraState(resolveUnitId(unit)).buffs:get(auraName)
        return aura ~= nil and (not count or count(aura.count)) and (not duration or duration({type = "duration", value = aura.remainingTime}))
    end,
    casting = function(self, unit)
        return isSpellcasting(resolveUnitId(unit))
    end,
    combat = function(self, unit)
        return UnitAffectingCombat(resolveUnitId(unit))
    end,
    comboPoints = function(self, unit, points)
        return points(GetComboPoints(
            "player",
            resolveUnitId(unit)
        ))
    end,
    creature = function(self, unit, ____type)
        local creatureType = UnitCreatureType(resolveUnitId(unit))
        local ____creatureType_0
        if creatureType then
            ____creatureType_0 = string.lower(creatureType) == ____type
        else
            ____creatureType_0 = false
        end
        return ____creatureType_0
    end,
    cursed = function(self, unit)
        return getAuraState(resolveUnitId(unit)).isCursed
    end,
    dead = function(self, unit)
        return UnitIsDeadOrGhost(resolveUnitId(unit))
    end,
    debuff = function(self, unit, auraName, count, duration)
        local aura = getAuraState(resolveUnitId(unit)).debuffs:get(auraName)
        return aura ~= nil and (not count or count(aura.count)) and (not duration or duration({type = "duration", value = aura.remainingTime}))
    end,
    diseased = function(self, unit)
        return getAuraState(resolveUnitId(unit)).isDiseased
    end,
    dodged = function(self, unit)
        return hasMissed(
            resolveUnitId(unit),
            "dodge"
        )
    end,
    elite = function(self, unit)
        repeat
            local ____switch20 = UnitClassification(resolveUnitId(unit))
            local ____cond20 = ____switch20 == "elite" or ____switch20 == "rareelite" or ____switch20 == "worldboss"
            if ____cond20 then
                return true
            end
        until true
        return false
    end,
    energy = function(self, unit, amount)
        return amount(UnitPower(
            resolveUnitId(unit),
            Enum.PowerType.Energy
        ))
    end,
    existing = function(self, unit)
        return UnitExists(resolveUnitId(unit))
    end,
    harm = function(self, unit)
        return UnitCanAttack(
            "player",
            resolveUnitId(unit)
        )
    end,
    health = function(self, unit, percentage)
        local unitId = resolveUnitId(unit)
        return percentage({
            type = "percentage",
            value = getPercentage(
                UnitHealth(unitId),
                UnitHealthMax(unitId)
            )
        })
    end,
    help = function(self, unit)
        return UnitCanAssist(
            "player",
            resolveUnitId(unit)
        )
    end,
    is = function(self, unit, targetUnitId)
        return UnitIsUnit(
            resolveUnitId(unit),
            targetUnitId
        )
    end,
    level = function(self, unit, level)
        return level(UnitLevel(resolveUnitId(unit)))
    end,
    magicBuff = function(self, unit)
        return getAuraState(resolveUnitId(unit)).hasMagicBuff
    end,
    magicDebuff = function(self, unit)
        return getAuraState(resolveUnitId(unit)).hasMagicDebuff
    end,
    mana = function(self, unit, percentage)
        local unitId = resolveUnitId(unit)
        return percentage({
            type = "percentage",
            value = getPercentage(
                UnitPower(unitId, Enum.PowerType.Mana),
                UnitPowerMax(unitId, Enum.PowerType.Mana)
            )
        })
    end,
    missing = function(self, unit)
        return not UnitExists(resolveUnitId(unit))
    end,
    npc = function(self, unit)
        local unitId = resolveUnitId(unit)
        return UnitExists(unitId) and not UnitIsPlayer(unitId)
    end,
    ownBuff = function(self, unit, auraName, count, duration)
        local aura = getAuraState(resolveUnitId(unit)).ownBuffs:get(auraName)
        return aura ~= nil and (not count or count(aura.count)) and (not duration or duration({type = "duration", value = aura.remainingTime}))
    end,
    ownDebuff = function(self, unit, auraName, count, duration)
        local aura = getAuraState(resolveUnitId(unit)).ownDebuffs:get(auraName)
        return aura ~= nil and (not count or count(aura.count)) and (not duration or duration({type = "duration", value = aura.remainingTime}))
    end,
    parried = function(self, unit)
        return hasMissed(
            resolveUnitId(unit),
            "parry"
        )
    end,
    partyMember = function(self, unit)
        return UnitInParty(resolveUnitId(unit))
    end,
    poisoned = function(self, unit)
        return getAuraState(resolveUnitId(unit)).isPoisoned
    end,
    rage = function(self, unit, amount)
        return amount(UnitPower(
            resolveUnitId(unit),
            Enum.PowerType.Rage
        ))
    end,
    targeting = function(self, unit, targetUnitId)
        local unitId = resolveUnitId(unit)
        return UnitExists(unitId .. "target") and UnitIsUnit(unitId .. "target", targetUnitId)
    end,
    trivial = function(self, unit)
        return UnitIsTrivial(resolveUnitId(unit))
    end
}
return ____exports
 end,
["core.action-bar-controller"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local ____exports = {}
local ____button_2Dbehavior = require("dsl.button-behavior")
local ButtonBehaviorMap = ____button_2Dbehavior.ButtonBehaviorMap
local ____button_2Dbehavior = require("dsl.button-behavior")
local createButtonBehaviors = ____button_2Dbehavior.createButtonBehaviors
local ____parser = require("dsl.parser")
local Configuration = ____parser.Configuration
local ____predicate_2Dregistry = require("dsl.predicate-registry")
local PredicateRegistry = ____predicate_2Dregistry.PredicateRegistry
local ____action = require("core.action")
local Action = ____action.Action
local getActions = ____action.getActions
local ____button_2Dappearance = require("core.button-appearance")
local ButtonAppearance = ____button_2Dappearance.ButtonAppearance
local createButtonAppearance = ____button_2Dappearance.createButtonAppearance
local ____pet_2Dpredicates = require("core.pet-predicates")
local petPredicates = ____pet_2Dpredicates.petPredicates
local ____player_2Dpredicates = require("core.player-predicates")
local playerPredicates = ____player_2Dpredicates.playerPredicates
local ____universal_2Dpredicates = require("core.universal-predicates")
local universalPredicates = ____universal_2Dpredicates.universalPredicates
____exports.ActionBarController = __TS__Class()
local ActionBarController = ____exports.ActionBarController
ActionBarController.name = "ActionBarController"
function ActionBarController.prototype.____constructor(self)
    self.predicateRegistry = {pet = petPredicates, player = playerPredicates, universal = universalPredicates}
    self.buttonBehaviors = __TS__New(Map)
end
function ActionBarController.prototype.setConfigurations(self, ...)
    local configurations = {...}
    do
        local function ____catch(____error)
            print(____error.message)
        end
        local ____try, ____hasReturned = pcall(function()
            self.buttonBehaviors = createButtonBehaviors(
                self.predicateRegistry,
                unpack(configurations)
            )
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function ActionBarController.prototype.start(self)
    if not self.frame then
        self.frame = CreateFrame("Frame")
        self.frame:SetScript(
            "OnUpdate",
            function() return self:onUpdate() end
        )
    end
end
function ActionBarController.prototype.stop(self)
    if self.frame then
        self.frame:SetScript("OnUpdate", nil)
        self.frame = nil
    end
end
function ActionBarController.prototype.onUpdate(self)
    for ____, action in ipairs(getActions()) do
        self:updateButton(
            action,
            createButtonAppearance(self.buttonBehaviors, action)
        )
    end
end
function ActionBarController.prototype.updateButton(self, action, buttonAppearance)
    local ____action_0 = action
    local button = ____action_0.button
    if buttonAppearance.enabled then
        if buttonAppearance.effect == "flashing" then
            if not ActionButton_IsFlashing(button) then
                ActionButton_StartFlash(button)
            end
        elseif ActionButton_IsFlashing(button) then
            ActionButton_StopFlash(button)
        end
        if buttonAppearance.effect == "glowing" then
            ActionButton_ShowOverlayGlow(button)
        else
            ActionButton_HideOverlayGlow(button)
        end
        button.icon:SetVertexColor(1, 1, 1)
        button:SetChecked(false)
    else
        if ActionButton_IsFlashing(button) then
            ActionButton_StopFlash(button)
        end
        ActionButton_HideOverlayGlow(button)
        if buttonAppearance.color == "blue" then
            button.icon:SetVertexColor(0, 0.4, 0.4)
        elseif buttonAppearance.color == "red" then
            button.icon:SetVertexColor(0.4, 0, 0)
        elseif buttonAppearance.color == "violet" then
            button.icon:SetVertexColor(0.4, 0, 0.4)
        else
            button.icon:SetVertexColor(0.4, 0.4, 0.4)
        end
        local ____button_2 = button
        local ____button_SetChecked_3 = button.SetChecked
        local ____buttonAppearance_checked_1 = buttonAppearance.checked
        if ____buttonAppearance_checked_1 == nil then
            ____buttonAppearance_checked_1 = false
        end
        ____button_SetChecked_3(____button_2, ____buttonAppearance_checked_1)
    end
end
return ____exports
 end,
["ui.document"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local ____exports = {}
function ____exports.createDocument(____bindingPattern0)
    local content
    local title
    title = ____bindingPattern0.title
    content = ____bindingPattern0.content
    return {
        content = content,
        id = ("document_" .. tostring(GetTimePreciseSec())) .. "}",
        title = title
    }
end
function ____exports.deleteDocument(documents, id)
    local newDocuments = __TS__ArrayFilter(
        documents,
        function(____, ____bindingPattern0)
            local otherId
            otherId = ____bindingPattern0.id
            return otherId ~= id
        end
    )
    return #newDocuments ~= #documents and newDocuments or nil
end
function ____exports.findDocument(documents, id)
    return __TS__ArrayFind(
        documents,
        function(____, ____bindingPattern0)
            local otherId
            otherId = ____bindingPattern0.id
            return otherId == id
        end
    )
end
function ____exports.updateDocument(documents, newDocument)
    local index = __TS__ArrayFindIndex(
        documents,
        function(____, ____bindingPattern0)
            local id
            id = ____bindingPattern0.id
            return id == newDocument.id
        end
    )
    local document = documents[index + 1]
    if not document or document.title == newDocument.title and document.content == newDocument.content then
        return
    end
    local newDocuments = {unpack(documents)}
    newDocuments[index + 1] = newDocument
    return newDocuments
end
function ____exports.validateDocuments(documents)
    return __TS__ArrayFilter(
        documents,
        function(____, document) return document.id ~= nil and type(document.id) == "string" and document.title ~= nil and type(document.title) == "string" and document.content ~= nil and type(document.content) == "string" end
    )
end
return ____exports
 end,
["ui.signal"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Set = ____lualib.Set
local __TS__New = ____lualib.__TS__New
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__Iterator = ____lualib.__TS__Iterator
local ____exports = {}
local Source, Computation
local State = __TS__Class()
State.name = "State"
function State.prototype.____constructor(self)
    self.changedSignals = __TS__New(Set)
    self.batchDepth = 0
    self.computationDepth = 0
    self.isUntrackedComputation = false
end
__TS__SetDescriptor(
    State.prototype,
    "isBatching",
    {get = function(self)
        return self.batchDepth > 0
    end},
    true
)
__TS__SetDescriptor(
    State.prototype,
    "isComputing",
    {get = function(self)
        return self.computationDepth > 0
    end},
    true
)
__TS__SetDescriptor(
    State.prototype,
    "isTracking",
    {get = function(self)
        return self.trackedSignals ~= nil
    end},
    true
)
____exports.Signal = __TS__Class()
local Signal = ____exports.Signal
Signal.name = "Signal"
function Signal.prototype.____constructor(self)
    self.state = __TS__New(State)
end
function Signal.createLine(self)
    return __TS__New(____exports.Signal)
end
function Signal.createSource(self, initialValue)
    return ____exports.Signal.defaultLine:createSource(initialValue)
end
function Signal.prototype.createSource(self, initialValue)
    if self.state.isBatching then
        error(
            __TS__New(Error, "Cannot create signal while batching"),
            0
        )
    end
    if self.state.isComputing then
        error(
            __TS__New(Error, "Cannot create signal while computing"),
            0
        )
    end
    if self.state.isTracking then
        error(
            __TS__New(Error, "Cannot create signal while tracking"),
            0
        )
    end
    return __TS__New(Source, self.state, initialValue)
end
function Signal.createComputation(self, callback)
    return ____exports.Signal.defaultLine:createComputation(callback)
end
function Signal.prototype.createComputation(self, callback)
    if self.state.isBatching then
        error(
            __TS__New(Error, "Cannot create signal while batching"),
            0
        )
    end
    if self.state.isComputing then
        error(
            __TS__New(Error, "Cannot create signal while computing"),
            0
        )
    end
    if self.state.isTracking then
        error(
            __TS__New(Error, "Cannot create signal while tracking"),
            0
        )
    end
    return __TS__New(Computation, self.state, callback)
end
function Signal.batch(self, callback)
    ____exports.Signal.defaultLine:batch(callback)
end
function Signal.prototype.batch(self, callback)
    if self.state.isComputing then
        error(
            __TS__New(Error, "Cannot batch while computing"),
            0
        )
    end
    if self.state.isTracking then
        error(
            __TS__New(Error, "Cannot batch while tracking"),
            0
        )
    end
    local ____self_state_0, ____batchDepth_1 = self.state, "batchDepth"
    ____self_state_0[____batchDepth_1] = ____self_state_0[____batchDepth_1] + 1
    do
        pcall(function()
            callback()
        end)
        do
            local ____self_state_2, ____batchDepth_3 = self.state, "batchDepth"
            ____self_state_2[____batchDepth_3] = ____self_state_2[____batchDepth_3] - 1
        end
    end
    if self.state.isBatching then
        return
    end
    local uniqueListeners = __TS__New(Set)
    for ____, signal in __TS__Iterator(self.state.changedSignals) do
        if signal.pendingValue ~= signal.currentValue then
            signal.currentValue = signal.pendingValue
            for ____, listener in __TS__Iterator(signal.listeners) do
                uniqueListeners:add(listener)
            end
        end
    end
    self.state.changedSignals:clear()
    for ____, listener in __TS__Iterator(uniqueListeners) do
        listener()
    end
end
function Signal.track(self, callback)
    return ____exports.Signal.defaultLine:track(callback)
end
function Signal.prototype.track(self, callback)
    if self.state.isBatching then
        error(
            __TS__New(Error, "Cannot track while batching"),
            0
        )
    end
    if self.state.isComputing then
        error(
            __TS__New(Error, "Cannot track while computing"),
            0
        )
    end
    if self.state.isTracking then
        error(
            __TS__New(Error, "Cannot track while tracking"),
            0
        )
    end
    local ownTrackedSignals = __TS__New(Set)
    local listener
    listener = function()
        for ____, signal in __TS__Iterator(ownTrackedSignals) do
            signal.listeners:delete(listener)
        end
        ownTrackedSignals:clear()
        self.state.trackedSignals = ownTrackedSignals
        do
            pcall(function()
                callback()
            end)
            do
                self.state.trackedSignals = nil
            end
        end
        for ____, signal in __TS__Iterator(ownTrackedSignals) do
            signal.listeners:add(listener)
        end
    end
    listener()
    return function()
        for ____, signal in __TS__Iterator(ownTrackedSignals) do
            signal.listeners:delete(listener)
        end
    end
end
Signal.defaultLine = ____exports.Signal:createLine()
Source = __TS__Class()
Source.name = "Source"
function Source.prototype.____constructor(self, state, initialValue)
    self.listeners = __TS__New(Set)
    self.state = state
    self.initialValue = initialValue
    self.currentValue = initialValue
end
function Source.prototype.publish(self, newValue)
    if newValue == nil then
        newValue = self.initialValue
    end
    if not self.state.isBatching then
        error(
            __TS__New(Error, "Can only publish while batching"),
            0
        )
    end
    self.pendingValue = newValue
    self.state.changedSignals:add(self)
end
function Source.prototype.peek(self)
    if self.state.isComputing then
        error(
            __TS__New(Error, "Cannot peek while computing"),
            0
        )
    end
    return self.currentValue
end
function Source.prototype.subscribe(self)
    if not self.state.isTracking and not self.state.isComputing then
        error(
            __TS__New(Error, "Can only subscribe while tracking or computing"),
            0
        )
    end
    if not self.state.isUntrackedComputation then
        local ____opt_4 = self.state.trackedSignals
        if ____opt_4 ~= nil then
            ____opt_4:add(self)
        end
    end
    return self.currentValue
end
Computation = __TS__Class()
Computation.name = "Computation"
function Computation.prototype.____constructor(self, state, callback)
    self.state = state
    self.callback = callback
end
function Computation.prototype.peek(self)
    if self.state.isComputing then
        error(
            __TS__New(Error, "Cannot peek while computing"),
            0
        )
    end
    local ____self_state_6, ____computationDepth_7 = self.state, "computationDepth"
    ____self_state_6[____computationDepth_7] = ____self_state_6[____computationDepth_7] + 1
    self.state.isUntrackedComputation = true
    do
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            return true, self.callback()
        end)
        do
            local ____self_state_8, ____computationDepth_9 = self.state, "computationDepth"
            ____self_state_8[____computationDepth_9] = ____self_state_8[____computationDepth_9] - 1
            self.state.isUntrackedComputation = false
        end
        if ____try and ____hasReturned then
            return ____returnValue
        end
    end
end
function Computation.prototype.subscribe(self)
    if not self.state.isTracking and not self.state.isComputing then
        error(
            __TS__New(Error, "Can only subscribe while tracking or computing"),
            0
        )
    end
    local ____self_state_10, ____computationDepth_11 = self.state, "computationDepth"
    ____self_state_10[____computationDepth_11] = ____self_state_10[____computationDepth_11] + 1
    do
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            return true, self.callback()
        end)
        do
            local ____self_state_12, ____computationDepth_13 = self.state, "computationDepth"
            ____self_state_12[____computationDepth_13] = ____self_state_12[____computationDepth_13] - 1
        end
        if ____try and ____hasReturned then
            return ____returnValue
        end
    end
end
return ____exports
 end,
["ui.ui-state"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__New = ____lualib.__TS__New
local ____exports = {}
local ____document = require("ui.document")
local Document = ____document.Document
local ____signal = require("ui.signal")
local Signal = ____signal.Signal
____exports.UiState = __TS__Class()
local UiState = ____exports.UiState
UiState.name = "UiState"
function UiState.prototype.____constructor(self)
    self["$documents"] = Signal:createSource({})
    self["$selectedDocumentId"] = Signal:createSource(nil)
    self["$windowVisible"] = Signal:createSource(false)
    self["$selectedDocument"] = Signal:createComputation(function()
        local selectedDocumentId = self["$selectedDocumentId"]:subscribe()
        return __TS__ArrayFind(
            self["$documents"]:subscribe(),
            function(____, ____bindingPattern0)
                local id
                id = ____bindingPattern0.id
                return id == selectedDocumentId
            end
        )
    end)
end
UiState.default = __TS__New(____exports.UiState)
return ____exports
 end,
["ui.render-document-editor"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__StringReplaceAll = ____lualib.__TS__StringReplaceAll
local ____exports = {}
local createContainerFrame, createTitleFrame, createSaveButton, createContentScrollFrame, createContentFrame, createContentEditBox, createTitleEditBox
local ____document = require("ui.document")
local updateDocument = ____document.updateDocument
local ____signal = require("ui.signal")
local Signal = ____signal.Signal
local ____ui_2Dstate = require("ui.ui-state")
local UiState = ____ui_2Dstate.UiState
function createContainerFrame(parentFrame)
    local containerFrame = CreateFrame("Frame", nil, parentFrame)
    containerFrame:SetAllPoints(parentFrame)
    return containerFrame
end
function createTitleFrame(containerFrame)
    local titleFrame = CreateFrame("Frame", nil, containerFrame)
    titleFrame:SetHeight(27)
    titleFrame:SetPoint(
        "TOPLEFT",
        containerFrame,
        "TOPLEFT",
        0,
        0
    )
    titleFrame:SetPoint(
        "TOPRIGHT",
        containerFrame,
        "TOPRIGHT",
        0,
        0
    )
    return titleFrame
end
function createSaveButton(titleFrame)
    local saveButton = CreateFrame("Button", nil, titleFrame, "UIPanelButtonTemplate")
    saveButton:SetPoint(
        "TOPRIGHT",
        titleFrame,
        "TOPRIGHT",
        0,
        -2
    )
    saveButton:SetSize(60, 21)
    saveButton:SetText("Save")
    return saveButton
end
function createContentScrollFrame(containerFrame, titleFrame)
    local contentScrollFrame = CreateFrame("ScrollFrame", nil, containerFrame, "UIPanelScrollFrameTemplate")
    contentScrollFrame:SetPoint(
        "TOPLEFT",
        titleFrame,
        "BOTTOMLEFT",
        0,
        0
    )
    contentScrollFrame:SetPoint(
        "BOTTOMRIGHT",
        containerFrame,
        "BOTTOMRIGHT",
        0,
        0
    )
    return contentScrollFrame
end
function createContentFrame(contentScrollFrame)
    local contentFrame = CreateFrame("Frame", nil, contentScrollFrame)
    contentFrame:SetWidth(contentScrollFrame:GetWidth())
    contentFrame:SetHeight(contentScrollFrame:GetHeight())
    contentScrollFrame:SetScrollChild(contentFrame)
    return contentFrame
end
function createContentEditBox(contentFrame)
    local contentEditBox = CreateFrame("EditBox", nil, contentFrame)
    contentEditBox:SetFontObject("GameFontHighlight")
    contentEditBox:SetMultiLine(true)
    contentEditBox:SetPoint("LEFT", contentFrame, "LEFT")
    contentEditBox:SetPoint("RIGHT", contentFrame, "RIGHT")
    contentEditBox:SetPoint("TOP", contentFrame, "TOP")
    return contentEditBox
end
function createTitleEditBox(titleFrame, saveButton)
    local titleEditBox = CreateFrame("EditBox", nil, titleFrame, "InputBoxTemplate")
    titleEditBox:SetHeight(24)
    titleEditBox:SetMaxLetters(100)
    titleEditBox:SetPoint(
        "RIGHT",
        saveButton,
        "LEFT",
        -5,
        0
    )
    titleEditBox:SetPoint(
        "TOPLEFT",
        titleFrame,
        "TOPLEFT",
        5,
        0
    )
    return titleEditBox
end
function ____exports.renderDocumentEditor(parentFrame)
    local containerFrame = createContainerFrame(parentFrame)
    local titleFrame = createTitleFrame(containerFrame)
    local saveButton = createSaveButton(titleFrame)
    local contentScrollFrame = createContentScrollFrame(containerFrame, titleFrame)
    local contentFrame = createContentFrame(contentScrollFrame)
    local contentEditBox = createContentEditBox(contentFrame)
    local titleEditBox = createTitleEditBox(titleFrame, saveButton)
    local _____24content = Signal:createSource("")
    local _____24title = Signal:createSource("")
    local _____24hasUnsavedChanges = Signal:createComputation(function()
        local selectedDocument = UiState.default["$selectedDocument"]:subscribe()
        local content = _____24content:subscribe()
        local title = _____24title:subscribe()
        return selectedDocument and (selectedDocument.content ~= content or selectedDocument.title ~= title)
    end)
    saveButton:SetScript(
        "OnClick",
        function()
            local selectedDocumentId = UiState.default["$selectedDocumentId"]:peek()
            if selectedDocumentId ~= nil then
                local newDocuments = updateDocument(
                    UiState.default["$documents"]:peek(),
                    {
                        content = __TS__StringReplaceAll(
                            contentEditBox:GetText(),
                            "||",
                            "|"
                        ),
                        id = selectedDocumentId,
                        title = titleEditBox:GetText()
                    }
                )
                if newDocuments then
                    Signal:batch(function() return UiState.default["$documents"]:publish(newDocuments) end)
                end
            end
        end
    )
    contentEditBox:SetScript(
        "OnCursorChanged",
        function(____, x, y, width, height)
            ScrollingEdit_OnCursorChanged(
                contentEditBox,
                x,
                y,
                width,
                height
            )
        end
    )
    contentEditBox:SetScript(
        "OnTextChanged",
        function()
            ScrollingEdit_OnTextChanged(contentEditBox, contentScrollFrame)
            Signal:batch(function() return _____24content:publish(__TS__StringReplaceAll(
                contentEditBox:GetText(),
                "||",
                "|"
            )) end)
        end
    )
    contentEditBox:SetScript(
        "OnUpdate",
        function(____, elapsed)
            ScrollingEdit_OnUpdate(contentEditBox, elapsed, contentScrollFrame)
        end
    )
    titleEditBox:SetScript(
        "OnTextChanged",
        function()
            Signal:batch(function() return _____24title:publish(titleEditBox:GetText()) end)
        end
    )
    Signal:track(function()
        local selectedDocument = UiState.default["$selectedDocument"]:subscribe()
        contentEditBox:SetText(selectedDocument and selectedDocument.content or "")
        titleEditBox:SetText(selectedDocument and selectedDocument.title or "")
        if selectedDocument then
            contentEditBox:Enable()
            titleEditBox:Enable()
            titleEditBox:ClearFocus()
            titleEditBox:SetFocus()
        else
            contentEditBox:Disable()
            titleEditBox:Disable()
        end
    end)
    Signal:track(function()
        if _____24hasUnsavedChanges:subscribe() then
            saveButton:Enable()
        else
            saveButton:Disable()
        end
    end)
    return containerFrame
end
return ____exports
 end,
["ui.document-list-item"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local ____exports = {}
____exports.DocumentListItem = __TS__Class()
local DocumentListItem = ____exports.DocumentListItem
DocumentListItem.name = "DocumentListItem"
function DocumentListItem.prototype.____constructor(self, parent)
    self.frame = CreateFrame("Button", nil, parent)
    self.deleteButton = CreateFrame("Button", nil, self.frame)
    self.selectedTexture = self.frame:CreateTexture(nil, "ARTWORK")
    self.titleFontString = self.frame:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    self.frame:SetHeight(20)
    self.frame:SetScript(
        "OnEnter",
        function()
            if not self.selectedTexture:IsShown() then
                self.titleFontString:SetFontObject("GameFontHighlight")
            end
        end
    )
    self.frame:SetScript(
        "OnLeave",
        function()
            if not self.selectedTexture:IsShown() then
                self.titleFontString:SetFontObject("GameFontHighlightSmall")
            end
        end
    )
    self.deleteButton:SetSize(16, 16)
    self.deleteButton:SetPoint(
        "RIGHT",
        self.frame,
        "RIGHT",
        -5,
        0
    )
    self.deleteButton:SetNormalTexture("Interface\\Buttons\\UI-MinusButton-Up")
    self.deleteButton:SetPushedTexture("Interface\\Buttons\\UI-MinusButton-Down")
    self.deleteButton:SetHighlightTexture("Interface\\Buttons\\UI-PlusButton-Hilight")
    self.selectedTexture:SetColorTexture(0.97, 0.83, 0.28, 0.5)
    self.selectedTexture:SetAllPoints(self.frame)
    self.selectedTexture:Hide()
    self.titleFontString:SetPoint(
        "LEFT",
        self.frame,
        "LEFT",
        5,
        0
    )
    self.titleFontString:SetPoint(
        "RIGHT",
        self.deleteButton,
        "LEFT",
        -5,
        0
    )
    self.titleFontString:SetJustifyH("LEFT")
    local highlightTexture = self.frame:CreateTexture(nil, "HIGHLIGHT")
    highlightTexture:SetColorTexture(0.38, 0.38, 0.38, 1)
    highlightTexture:SetAllPoints(self.frame)
    self.frame:SetHighlightTexture(highlightTexture)
end
function DocumentListItem.prototype.render(self, props)
    if not props then
        self.frame:Hide()
        return
    end
    if props.selected then
        self.selectedTexture:Show()
        self.titleFontString:SetFontObject("GameFontHighlight")
    else
        self.selectedTexture:Hide()
        self.titleFontString:SetFontObject("GameFontHighlightSmall")
    end
    self.titleFontString:SetText(props.title)
    self.frame:SetScript("OnClick", props.onSelect)
    self.deleteButton:SetScript("OnClick", props.onDelete)
    self.frame:Show()
    self.frame:ClearAllPoints()
    if props.previousItem then
        self.frame:SetPoint(
            "TOPLEFT",
            props.previousItem.frame,
            "BOTTOMLEFT",
            0,
            0
        )
        self.frame:SetPoint(
            "TOPRIGHT",
            props.previousItem.frame,
            "BOTTOMRIGHT",
            0,
            0
        )
    else
        local parent = self.frame:GetParent()
        self.frame:SetPoint(
            "TOPLEFT",
            parent,
            "TOPLEFT",
            0,
            0
        )
        self.frame:SetPoint(
            "TOPRIGHT",
            parent,
            "TOPRIGHT",
            0,
            0
        )
    end
end
return ____exports
 end,
["ui.render-document-list"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__ArraySetLength = ____lualib.__TS__ArraySetLength
local __TS__New = ____lualib.__TS__New
local ____exports = {}
local createContainerFrame, createTopBarFrame, createAddButton, createListScrollFrame, createListFrame, scrollToBottom
local ____document = require("ui.document")
local createDocument = ____document.createDocument
local deleteDocument = ____document.deleteDocument
local ____document_2Dlist_2Ditem = require("ui.document-list-item")
local DocumentListItem = ____document_2Dlist_2Ditem.DocumentListItem
local ____signal = require("ui.signal")
local Signal = ____signal.Signal
local ____ui_2Dstate = require("ui.ui-state")
local UiState = ____ui_2Dstate.UiState
function createContainerFrame(parentFrame)
    local containerFrame = CreateFrame("Frame", nil, parentFrame)
    containerFrame:SetAllPoints(parentFrame)
    return containerFrame
end
function createTopBarFrame(containerFrame)
    local topBarFrame = CreateFrame("Frame", nil, containerFrame)
    topBarFrame:SetPoint(
        "TOPLEFT",
        containerFrame,
        "TOPLEFT",
        0,
        0
    )
    topBarFrame:SetPoint(
        "TOPRIGHT",
        containerFrame,
        "TOPRIGHT",
        0,
        0
    )
    topBarFrame:SetHeight(27)
    return topBarFrame
end
function createAddButton(topBarFrame)
    local addButton = CreateFrame("Button", nil, topBarFrame, "UIPanelButtonTemplate")
    addButton:SetPoint(
        "TOPLEFT",
        topBarFrame,
        "TOPLEFT",
        0,
        -2
    )
    addButton:SetPoint(
        "TOPRIGHT",
        topBarFrame,
        "TOPRIGHT",
        0,
        -2
    )
    addButton:SetHeight(21)
    addButton:SetText("New Document")
    return addButton
end
function createListScrollFrame(containerFrame, topBarFrame)
    local listScrollFrame = CreateFrame("ScrollFrame", nil, containerFrame, "UIPanelScrollFrameTemplate")
    listScrollFrame:SetPoint(
        "TOPLEFT",
        topBarFrame,
        "BOTTOMLEFT",
        0,
        0
    )
    listScrollFrame:SetPoint(
        "BOTTOMRIGHT",
        containerFrame,
        "BOTTOMRIGHT",
        0,
        0
    )
    return listScrollFrame
end
function createListFrame(listScrollFrame)
    local listFrame = CreateFrame("Frame", nil, listScrollFrame)
    listFrame:SetWidth(listScrollFrame:GetWidth())
    listFrame:SetHeight(listScrollFrame:GetHeight())
    listScrollFrame:SetScrollChild(listFrame)
    return listFrame
end
function scrollToBottom(scrollFrame)
    scrollFrame:UpdateScrollChildRect()
    scrollFrame:SetVerticalScroll(scrollFrame:GetVerticalScrollRange())
end
function ____exports.renderDocumentList(parentFrame)
    local containerFrame = createContainerFrame(parentFrame)
    local topBarFrame = createTopBarFrame(containerFrame)
    local addButton = createAddButton(topBarFrame)
    local listScrollFrame = createListScrollFrame(containerFrame, topBarFrame)
    local listFrame = createListFrame(listScrollFrame)
    local visibleItems = {}
    local invisibleItems = {}
    addButton:SetScript(
        "OnClick",
        function()
            local document = createDocument({
                content = "",
                title = "Document " .. tostring(#UiState.default["$documents"]:peek() + 1)
            })
            Signal:batch(function()
                local ____self_1 = UiState.default["$documents"]
                local ____self_1_publish_2 = ____self_1.publish
                local ____array_0 = __TS__SparseArrayNew(unpack(UiState.default["$documents"]:peek()))
                __TS__SparseArrayPush(____array_0, document)
                ____self_1_publish_2(
                    ____self_1,
                    {__TS__SparseArraySpread(____array_0)}
                )
                UiState.default["$selectedDocumentId"]:publish(document.id)
            end)
            scrollToBottom(listScrollFrame)
        end
    )
    Signal:track(function()
        local documents = UiState.default["$documents"]:subscribe()
        local selectedDocumentId = UiState.default["$selectedDocumentId"]:subscribe()
        for ____, item in ipairs(visibleItems) do
            item:render()
            invisibleItems[#invisibleItems + 1] = item
        end
        __TS__ArraySetLength(visibleItems, 0)
        do
            local index = 0
            while index < #documents do
                do
                    local __continue9
                    repeat
                        local document = documents[index + 1]
                        if not document then
                            __continue9 = true
                            break
                        end
                        local item = table.remove(invisibleItems) or __TS__New(DocumentListItem, listFrame)
                        visibleItems[#visibleItems + 1] = item
                        item:render({
                            onDelete = function()
                                local newDocuments = deleteDocument(
                                    UiState.default["$documents"]:peek(),
                                    document.id
                                )
                                if newDocuments then
                                    Signal:batch(function() return UiState.default["$documents"]:publish(newDocuments) end)
                                end
                            end,
                            onSelect = function() return Signal:batch(function() return UiState.default["$selectedDocumentId"]:publish(document.id) end) end,
                            previousItem = visibleItems[index],
                            selected = document.id == selectedDocumentId,
                            title = document.title
                        })
                        __continue9 = true
                    until true
                    if not __continue9 then
                        break
                    end
                end
                index = index + 1
            end
        end
    end)
    return containerFrame
end
return ____exports
 end,
["ui.render-window"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local createWindowFrame, createContainerFrame, createLeftPanelFrame, createRightPanelFrame
local ____render_2Ddocument_2Deditor = require("ui.render-document-editor")
local renderDocumentEditor = ____render_2Ddocument_2Deditor.renderDocumentEditor
local ____render_2Ddocument_2Dlist = require("ui.render-document-list")
local renderDocumentList = ____render_2Ddocument_2Dlist.renderDocumentList
local ____signal = require("ui.signal")
local Signal = ____signal.Signal
local ____ui_2Dstate = require("ui.ui-state")
local UiState = ____ui_2Dstate.UiState
function createWindowFrame()
    local windowFrame = CreateFrame("Frame", nil, UIParent, "BasicFrameTemplateWithInset")
    windowFrame:Hide()
    windowFrame:EnableMouse(true)
    windowFrame:EnableMouseWheel(true)
    windowFrame:RegisterForDrag("LeftButton")
    windowFrame:SetMovable(true)
    windowFrame:SetPoint(
        "CENTER",
        UIParent,
        "CENTER",
        0,
        0
    )
    windowFrame:SetScript("OnDragStart", windowFrame.StartMoving)
    windowFrame:SetScript("OnDragStop", windowFrame.StopMovingOrSizing)
    windowFrame:SetSize(800, 600)
    return windowFrame
end
function createContainerFrame(windowFrame)
    local containerFrame = CreateFrame("Frame", nil, windowFrame)
    containerFrame:SetPoint(
        "TOPLEFT",
        windowFrame,
        "TOPLEFT",
        7,
        -27
    )
    containerFrame:SetPoint(
        "BOTTOMRIGHT",
        windowFrame,
        "BOTTOMRIGHT",
        -9,
        6
    )
    return containerFrame
end
function createLeftPanelFrame(containerFrame)
    local leftPanelFrame = CreateFrame("Frame", nil, containerFrame)
    leftPanelFrame:SetPoint(
        "TOPLEFT",
        containerFrame,
        "TOPLEFT",
        5,
        -5
    )
    leftPanelFrame:SetPoint(
        "BOTTOMLEFT",
        containerFrame,
        "BOTTOMLEFT",
        5,
        5
    )
    leftPanelFrame:SetWidth(200)
    local background = leftPanelFrame:CreateTexture(nil, "BACKGROUND")
    background:SetAllPoints(leftPanelFrame)
    background:SetTexture("Interface\\DialogFrame\\UI-DialogBox-Background")
    return leftPanelFrame
end
function createRightPanelFrame(containerFrame, leftPanelFrame)
    local rightPanelFrame = CreateFrame("Frame", nil, containerFrame)
    rightPanelFrame:SetPoint(
        "TOPLEFT",
        leftPanelFrame,
        "TOPRIGHT",
        17 + 5 + 5,
        0
    )
    rightPanelFrame:SetPoint(
        "BOTTOMRIGHT",
        containerFrame,
        "BOTTOMRIGHT",
        -(17 + 5 + 5),
        5
    )
    local background = rightPanelFrame:CreateTexture(nil, "BACKGROUND")
    background:SetAllPoints(rightPanelFrame)
    background:SetTexture("Interface\\DialogFrame\\UI-DialogBox-Background")
    return rightPanelFrame
end
function ____exports.renderWindow()
    local windowFrame = createWindowFrame()
    local containerFrame = createContainerFrame(windowFrame)
    local leftPanelFrame = createLeftPanelFrame(containerFrame)
    local rightPanelFrame = createRightPanelFrame(containerFrame, leftPanelFrame)
    windowFrame.TitleText:SetText("Prism")
    renderDocumentList(leftPanelFrame)
    renderDocumentEditor(rightPanelFrame)
    windowFrame:SetScript(
        "OnShow",
        function()
            C_Timer.After(
                0,
                function() return Signal:batch(function() return UiState.default["$windowVisible"]:publish(true) end) end
            )
        end
    )
    windowFrame:SetScript(
        "OnHide",
        function()
            C_Timer.After(
                0,
                function() return Signal:batch(function() return UiState.default["$windowVisible"]:publish(false) end) end
            )
        end
    )
    Signal:track(function()
        if UiState.default["$windowVisible"]:subscribe() then
            windowFrame:Show()
        else
            windowFrame:Hide()
        end
    end)
    return windowFrame
end
return ____exports
 end,
["main"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__New = ____lualib.__TS__New
local __TS__ArrayPushArray = ____lualib.__TS__ArrayPushArray
local ____exports = {}
local ____action_2Dbar_2Dcontroller = require("core.action-bar-controller")
local ActionBarController = ____action_2Dbar_2Dcontroller.ActionBarController
local ____parser = require("dsl.parser")
local Configuration = ____parser.Configuration
local Parser = ____parser.Parser
local ____document = require("ui.document")
local Document = ____document.Document
local validateDocuments = ____document.validateDocuments
local ____render_2Dwindow = require("ui.render-window")
local renderWindow = ____render_2Dwindow.renderWindow
local ____signal = require("ui.signal")
local Signal = ____signal.Signal
local ____ui_2Dstate = require("ui.ui-state")
local UiState = ____ui_2Dstate.UiState
local frame = CreateFrame("Frame")
frame:RegisterEvent("ADDON_LOADED")
local global = _G
frame:SetScript(
    "OnEvent",
    function(____, event, addonName)
        if event == "ADDON_LOADED" and addonName == "Prism" then
            Signal:batch(function() return UiState.default["$documents"]:publish(validateDocuments(PrismSavedVariablesPerCharacter and PrismSavedVariablesPerCharacter.documents or ({}))) end)
            local actionBarController = __TS__New(ActionBarController)
            Signal:track(function()
                local documents = UiState.default["$documents"]:subscribe()
                PrismSavedVariablesPerCharacter = {documents = documents}
                local configurations = {}
                for ____, document in ipairs(documents) do
                    local result = __TS__New(Parser, document.content):parse()
                    if result.success then
                        __TS__ArrayPushArray(configurations, result.data)
                    else
                        local position = result.position and (("at line " .. tostring(result.position.line)) .. ", column ") .. tostring(result.position.column) or "at unknown position"
                        print((((("Parse error in document \"" .. document.title) .. "\": ") .. result.reason) .. " ") .. position)
                    end
                end
                actionBarController:setConfigurations(unpack(configurations))
            end)
            actionBarController:start()
            renderWindow()
            SlashCmdList.PRISM = function() return Signal:batch(function() return UiState.default["$windowVisible"]:publish(not UiState.default["$windowVisible"]:peek()) end) end
            global.SLASH_PRISM1 = "/prism"
        end
    end
)
return ____exports
 end,
["wow.action-button"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
 end,
["wow.api"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
 end,
["wow.c-timer"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
 end,
["wow.enum"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
 end,
["wow.game-tooltip"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
 end,
["wow.scrolling-edit"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
 end,
["wow.slash-cmd-list"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
 end,
["wow.ui-object"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
 end,
["wow.ui-parent"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
 end,
}
return require("main", ...)
