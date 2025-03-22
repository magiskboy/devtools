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
        <p>All jq queries and HTTP requests to fetch JSON are processed locally in your browser.<br />
        Snippets are only sent to the server when you choose to share them.</p>
        Copyright &copy; {new Date().getFullYear()} - <a href="https://nkthanh.dev">nkthanh.dev</a>
      </div>
    </footer>
  );
}
