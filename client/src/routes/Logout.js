import React from 'react'


export default async function Logout() {
    const response = await fetch('/logout')
    window.location.href = '/';

    return;
}
