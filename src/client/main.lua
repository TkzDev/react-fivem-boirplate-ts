---@description Thread principal do resource ao iniciar.
ThreadNew(function()
	if GetResourceState("ox_lib") ~= "started" then
	  warn("^5[" .. Resource .. "] ^0ox_lib is not started!^0.")
	  return
	end
  
	print("^5[" .. Resource .. "] ^0Client loaded successfully!^0.")
end)
  