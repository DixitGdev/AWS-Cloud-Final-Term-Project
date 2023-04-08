import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ photo, name }) => (

  <div className="max-h-fit rounded-xl group relative shadow-card  hover:shadow-cardhover card">
    <img
      className="w-full h-full object-cover rounded-lg"
      src={photo}
      alt={"Image"}
    />
    <div className="group-hover:flex flex-col max-h-[90%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f85] m-2 p-1 rounded-md">
      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-5">
        <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name.split('/')[1].split('-')[1][0]}</div>
          <p className="text-white text-sm">{name.split('/')[1]}</p>
          <button type="button" onClick={() => downloadImage(photo)} className="my-2 outline-none bg-transparent border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>
        </div>
      </div>

    </div>
  </div>
);

export default Card;
