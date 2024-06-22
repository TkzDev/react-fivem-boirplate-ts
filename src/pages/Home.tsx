import { useState } from 'react';
import TopInfos from '../components/TopInfos';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { isEnvBrowser } from '../utils/misc';
import clsx from 'clsx';
import { debugData } from '../utils/debugData';

setTimeout(() => {
  debugData([
    {
      action: 'edit:logo',
      data: 'https://cdn.discordapp.com/attachments/1175088901472395304/1212169624012193893/image.png?ex=65f0dbef&is=65de66ef&hm=f9feab3fe19fd5dfc112c6cb0f86c04a1721262322ab526be5a6874b8cee9ecd&',
    },
  ]);
}, 5000);

export default function Home() {
  const [visible, setVisible] = useState(isEnvBrowser());
  const [logo, setLogo] = useState('https://cdn.discordapp.com/attachments/1226078743877910629/1245027139288305764/Fluxo-Roleplay-1000x1000.png?ex=66574161&is=6655efe1&hm=257d65164b943f08bd6aed150960f66f7a7741cbfdd3bd35b2a538ad84ef3d6b&');


  useNuiEvent('switch:logo', setLogo);
  useNuiEvent('show:hud', () => setVisible(true));
  useNuiEvent('hide:hud', () => setVisible(false));

  if (!visible)
    return (
      <>
        <img
          className='w-[10rem] animate-fade absolute top-[5.3%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          src={logo}
          alt=''
        />
      </>
    );

  return (
    <div id='responsive' className={clsx('w-screen h-screen animate-fade')}>
      <TopInfos />
      <img
        className='w-[10rem] animate-fade absolute top-[5.3%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        src={logo}
        alt=''
      />
    </div>
  );
}
