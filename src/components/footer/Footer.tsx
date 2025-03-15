import { useEffect, useState } from "react";
import { getMyIP } from "../../libs/helpers";

export const Footer = () => {
  const [myip, setMyIP] = useState('');

  useEffect(() => {
    getMyIP().then(ip => setMyIP(ip)).catch(() => setMyIP('unknown'));
  }, []);

  return (
    <footer className="block py-4">
      <div className="content has-text-centered">
        <p>My IP: {myip}</p>
        Copyright &copy; {new Date().getFullYear()} - <a href="https://nkthanh.dev">nkthanh.dev</a>
      </div>
    </footer>
  );
}
