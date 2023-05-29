import { useEffect } from "react";
import { Network } from "expo";

async function getLocalIpAddress() {
  const ipAddress = await Network.getIpAddressAsync();
  return ipAddress || null;
}

// Usage
useEffect(() => {
  getLocalIpAddress().then((ipv4) => {
    console.log(ipv4);
  });
}, []);
