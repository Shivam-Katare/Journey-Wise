import React from 'react';
import { FaBookmark, FaGithub } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import './NavBar.css';

function NavBar({ apiKey, handleSaveKey, handleApiKeyChange, myKey }) {

  return (
    <>
      <div className='w-full grid justify-items-center grid-cols-3 mt-8'>
        <div onClick={() => document.getElementById('api_modal').showModal()}>
          <div tabIndex={0} role="button" className="btn indicator">
            <div className="w-full">
              <h1>Get Your Key</h1>
              <span className="indicator-item badge">{myKey}</span>
            </div>
          </div>
        </div>

        <div className='w-full grid justify-items-center'>
          <h1 className="text-5xl font-bold gradient-color sigmar mb-2 z-10 cursor-pointer" onClick={() => document.getElementById('info_modal').showModal()}>Journey Wise</h1>
          <p className='anton-regular text-2xl z-0'>Discover, Plan, Explore</p>
        </div>

        <div>
          <div>
            <div className='grid justify-items-center w-full grid-cols-[0.2fr_1fr] gap-x-2 items-center'>
              <div></div>
              <a href='https://github.com/Shivam-Katare/Journey-Wise' target='_blank' className='grid justify-items-center w-full grid-cols-[0.2fr_1fr] gap-x-2 items-center'>
                <FaGithub className='hover:text-yellow-500' />
                <div className="animation-text w-[9rem]">
                  <span>Give it a star</span>
                  <span>Raise an issue</span>
                  <span>Wanna contribute?</span>
                  <span>Suggest features</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <dialog id="api_modal" className="modal" data-theme="fantasy">
        <div className="modal-box">
          <div className='w-full grid justify-items-center gap-y-8'>
            <div className='w-full grid justify-items-center'>
              <input
                type="text"
                placeholder="Enter Your API Key to save it..."
                className="input input-bordered w-full"
                value={apiKey}
                onChange={handleApiKeyChange}
              />
            </div>
            <div className='w-full grid justify-items-center'>
              <button
                className={`btn btn-active w-full bg-[aquamarine] ${apiKey === '' ? 'opacity-50 text-black cursor-not-allowed' : ''}`}
                onClick={handleSaveKey}
                disabled={apiKey === ''}
              >
                Save My Key <FaBookmark />
              </button>            </div>

            <div className='w-full grid justify-items-center'>
              <a href='https://aistudio.google.com/app/apikey' target='_blank' className='w-full'><button className="btn btn-active w-full bg-black text-white">Get Your API Key <FaExternalLinkAlt /></button></a>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="info_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4"><b>JourneyWise</b> is here to shake things up! This fun app, built with technologies like Vite, React JS,
            Tailwind CSS, and the powerful Gemini API, takes the guesswork out of planning your next adventure.</p>

          <p className='py-4'><b>Remember:</b> While JourneyWise strives for accuracy,
            AI can be a playful fellow. Double-checking details and embracing the unexpected are part of the fun!</p>

          <h3 className="font-bold text-lg text-center">Made with 😊 happiness by <a href='https://github.com/Shivam-Katare' target='_blank' className='text-yellow-900'>Shivam Katare</a></h3>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default NavBar;
