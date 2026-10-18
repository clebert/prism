local suite = { failures = {} }

function suite.scenario(name, callback)
    local client = dofile("tests/client.lua")
    local ok, message = pcall(callback, client)

    for _, frame in ipairs(client.frames) do
        if frame.frameType == "CheckButton" then
            _G[frame.name] = nil
        end
    end

    if ok then
        print(name .. " passed.")
    else
        suite.failures[#suite.failures + 1] = name .. ": " .. tostring(message)
        print(suite.failures[#suite.failures])
    end
end

function suite.finish(name)
    assert(#suite.failures == 0, table.concat(suite.failures, "\n"))
    print(name .. " tests passed.")
end

return suite
