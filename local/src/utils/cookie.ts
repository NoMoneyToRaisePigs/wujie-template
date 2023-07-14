const TokenKey = 'admin-token'

function setCookie(name: string, value : string | number, daysToLive = 365) {
  let cookie = name + '=' + encodeURIComponent(value)

  if(typeof daysToLive === 'number') {
    cookie += '; max-age=' + (daysToLive*24*60*60)

    document.cookie = cookie
  }
}

function getCookie(name: string) {
  const cookieArr = document.cookie.split(';')

  for(let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=')

    if(name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1])
    }
  }

  return null
}

function setToken(token: string) {
  setCookie(TokenKey, token)
}

function getToken() {
  return getCookie(TokenKey)
}

export default {
  setToken,
  getToken,
}