import { useEffect } from 'react';

// themes
import ayu_dark from 'lib/themes/ayu_dark';
import ayu_light from 'lib/themes/ayu_light';
import ayu_mirage from 'lib/themes/ayu_mirage';
import dark_blue from 'lib/themes/dark_blue';
import dracula from 'lib/themes/dracula';
import nord from 'lib/themes/nord';
import qogir_dark from 'lib/themes/qogir_dark';
import meow from 'lib/themes/meow';
import ayu_meow from 'lib/themes/ayu_meow';
import blue_pink from 'lib/themes/blue_pink';
import mirage_meow from 'lib/themes/mirage_meow';


import { createEmotionCache, MantineProvider, MantineThemeOverride } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { SpotlightProvider } from '@mantine/spotlight';
import { userSelector } from 'lib/recoil/user';
import { useRecoilValue } from 'recoil';

import { createSpotlightActions } from 'lib/spotlight';
import { useRouter } from 'next/router';
import { IconSearch } from '@tabler/icons-react';

export const themes = {
  system: (colorScheme: 'dark' | 'light') => (colorScheme === 'dark' ? ayu_meow : meow),
  dark_blue,
  ayu_dark,
  ayu_mirage,
  ayu_light,
  nord,
  dracula,
  qogir_dark,
  meow,
  ayu_meow,
  blue_pink,
  mirage_meow,
};

export const friendlyThemeName = {
  system : 'Default',
  dark_blue: 'Dark Blue',
  ayu_dark: 'Ayu Dark',
  ayu_meow: 'Ayu Meow',
  ayu_mirage: 'Ayu Mirage',
  mirage_meow: 'Mirage Meow',
  ayu_light: 'Ayu Light',
  nord: 'Nord',
  dracula: 'Dracula',
  qogir_dark: 'Qogir Dark',
  meow: 'Light Pink',
  blue_pink: 'Blue Pink',
};

const cache = createEmotionCache({ key: 'zipline' });

export default function ZiplineTheming({ Component, pageProps, ...props }) {
  const user = useRecoilValue(userSelector);
  const colorScheme = useColorScheme();
  const router = useRouter();
  

  let theme: MantineThemeOverride;

  if (!user) theme = themes.system(colorScheme);
  else if (user.systemTheme === 'system') theme = themes.system(colorScheme);
  else theme = themes[user.systemTheme] ?? themes.system(colorScheme);

  useEffect(() => {
    document.documentElement.style.setProperty('color-scheme', theme.colorScheme);
  }, [user, theme]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={cache}
      theme={{
        ...theme,
        fontFamily: 'Ubuntu, sans-serif',
        fontFamilyMonospace: 'Ubuntu Mono, monospace',
        headings: {
          fontFamily: 'Ubuntu, sans-serif',
        },
        components: {
          AppShell: {
            styles: (t) => ({
              main: {
                backgroundColor: t.other.AppShell_backgroundColor,
              },
            }),
          },
          NavLink: {
            styles: (t) => ({
              icon: {
                paddingLeft: t.spacing.sm,
              },
            }),
          },
          Modal: {
            defaultProps: {
              closeButtonProps: { size: 'lg' },
              centered: true,
              transitionProps: {
                exitDuration: 100,
              },
              overlayProps: {
                blur: 6,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
              },
            },
          },
          Popover: {
            defaultProps: {
              transition: 'pop',
              shadow: 'lg',
            },
          },
          LoadingOverlay: {
            defaultProps: {
              overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
              overlayOpacity: 0.3,
            },
          },
          Loader: {
            defaultProps: {
              variant: 'dots',
            },
          },
          Card: {
            styles: (t) => ({
              root: {
                backgroundColor: t.colorScheme === 'dark' ? t.colors.dark[6] : t.colors.gray[0],
              },
            }),
          },
          Image: {
            styles: (t) => ({
              placeholder: {
                backgroundColor: t.colorScheme === 'dark' ? t.colors.dark[6] : t.colors.gray[0],
              },
            }),
          },
        },
      }}
    >
      <ModalsProvider>
        <SpotlightProvider
          searchIcon={<IconSearch size='1rem' />}
          shortcut={['mod + k', '/']}
          actions={createSpotlightActions(router)}
        >
          <Notifications position='top-center' style={{ marginTop: -10 }} />
          {props.children ? props.children : <Component {...pageProps} />}
        </SpotlightProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
