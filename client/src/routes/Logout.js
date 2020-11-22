import React from 'react'

export default function Logout() {
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
          window.location.href = '/';
    return;
}
