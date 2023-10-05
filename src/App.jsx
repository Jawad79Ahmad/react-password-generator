import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('')
  const [allowedNumber, setAllowedNumber] = useState(false)
  const [allowedChar, setAllowedChar] = useState(false)
  const [coptBtnText, setCopyBtnText] = useState('Copy Password')
  const passwordRef = useRef('');

  // const generatePassword = useCallback(() => {
  //   let pass = ''
  //   let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  //   if(allowedNumber) str += '0123456789'
  //   if(allowedChar) str += '~!@#$%^&*_+=-'

  //   for (let i = 1; i < length; i++) {
  //     let passChar = Math.floor(Math.random() * str.length + 1);
  //     pass += str.charAt(passChar);
  //   }

  //   setPassword(pass);

  // }, [length, allowedNumber, allowedChar, setPassword])

  useEffect(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(allowedNumber) str += '0123456789'
    if(allowedChar) str += '~!@#$%^&*_+=-'

    for (let i = 1; i < length; i++) {
      let passChar = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(passChar);
    }

    /*
      if we want to use generatePassword Callback then we will place here generatePassword() insted setPassword State
      also in need to add generatePassword Callback in dependencies
    */
    setPassword(pass)
    setCopyBtnText('Copy Password');
  }, [length, allowedChar, allowedNumber])

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setCopyBtnText('Password Copied!')
  }, [password])

  return (
    <div>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center text-2xl my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className="outline-none text-gray-700 w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            {coptBtnText}
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={24}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
              ref={passwordRef}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={allowedNumber}
            id="numberInput"
            onChange={() => { setAllowedNumber((prev) => !prev) }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={allowedChar}
              id="characterInput"
              onChange={() => { setAllowedChar((prev) => !prev ) }}
            />
            <label htmlFor="characterInput">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
