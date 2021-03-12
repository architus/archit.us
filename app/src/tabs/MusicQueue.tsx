import { styled } from "linaria/react";
import React from "react";
import ReactJkMusicPlayer, { ReactJkMusicPlayerMode, ReactJkMusicPlayerTheme } from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

import DataGrid from "@app/components/DataGrid";
import { FormatterProps, Row } from "react-data-grid";
import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import { TabProps } from "@app/tabs/types";
import Badge from "@architus/facade/components/Badge";
import { color } from "@architus/facade/theme/color";

const Styled = {
  Layout: styled.div`
    padding: ${appVerticalPadding} ${appHorizontalPadding};
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    height: 100%;
  `,
  Title: styled.h2`
    color: ${color("textStrong")};
    font-size: 1.9rem;
    font-weight: 300;
  `,
  DataGridWrapper: styled.div`
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-grow: 1;
    .rdg-row {
      &:hover {
        cursor: pointer
      }
    };
  `,
  ThumbnailWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  `,
  TextWrapper: styled.div`
    font-size: 1.2rem;
    font-weight: 500;
  `,
  MusicWrapper: styled.div`
    .music-class {
      position: static;
      display: block;
      width: 100%;
    }
  `
};

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const TitleFormatter: React.FC<FormatterProps<Song, {}>> = ({ row }: { row: Song }) => (
  <Styled.TextWrapper>
    {row.title}
  </Styled.TextWrapper>
);

const ArtistFormatter: React.FC<FormatterProps<Song, {}>> = ({ row }: { row: Song }) => (
  <Styled.TextWrapper>
    {row.artist}
  </Styled.TextWrapper>
);

const DurationFormatter: React.FC<FormatterProps<Song, {}>> = ({ row }: { row: Song }) => (
  <Styled.TextWrapper>
    {row.duration}
  </Styled.TextWrapper>
);

type Song = {
  thumbnail_url: string;
  url: string;
  title: string;
  artist: string; 
  duration: string;
}

// temporary list for testing
const songs = [
  { 
    thumbnail_url: "https://img.youtube.com/vi/eB32nBE73yI/1.jpg",
    url: "https://www.youtube.com/watch?v=eB32nBE73yI",
    title: "25 To Life", artist: "EminemMusic", duration: "4:01"
  },
  {
    thumbnail_url: "https://img.youtube.com/vi/iX6ex5fYT7o/1.jpg",
    url: "https://www.youtube.com/watch?v=iX6ex5fYT7o",
    title: "Coconut Mall Mario Kart Wii Music Extended HD", artist: "Craig Maywell Games", duration: "29:59"
  },
  {
    thumbnail_url: "https://img.youtube.com/vi/Z0Uh3OJCx3o/1.jpg",
    url: "https://www.youtube.com/watch?v=Z0Uh3OJCx3o",
    title: "Chug Jug With You - Parody of American Boy (number one victory royale)", artist: "Leviathan", duration: "2:58"
  },
  {
    thumbnail_url: "https://img.youtube.com/vi/KsEg3E9Zobc/1.jpg",
    url: "https://www.youtube.com/watch?v=KsEg3E9Zobc",
    title: "Boo Night Fever 3D Paper Mario Sticker Star 3D Music Extended", artist: "Kirbychu", duration: "15:30"
  },
];

const audioList1 = [
  {
    name: 'Despacito',
    singer: 'Luis Fonsi',
    cover:
      'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
    musicSrc:
      'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3',
    // support async fetch music src. eg.
    // musicSrc: async () => {
    //   return await fetch('/api')
    // },
  },
  {
    name: 'Dorost Nemisham',
    singer: 'Sirvan Khosravi',
    cover:
      'https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg',
    musicSrc:
      'https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3',
  },
]

const MusicQueue: React.FC<TabProps> = () => {
  const columns = [
    {
      key: "thumbnail_url",
      name: "",      
      maxWidth: 150,
      width: 150,
      formatter: ({ row }: { row: Song }) => (
        <Styled.ThumbnailWrapper>
          <img src={row.thumbnail_url} width="120" height="90"/>
        </Styled.ThumbnailWrapper>
      )
    },
    {
      key: "title",
      name: "Title",
      minWidth: 400,
      width: "auto",
      formatter: TitleFormatter,
    },
    {
      key: "artist",
      name: "Artist",
      minWidth: 300,
      width: "auto",
      formatter: ArtistFormatter,
    },
    {
      key: "duration",
      name: "Length",
      maxWidth: 200,
      width: 200,
      formatter: DurationFormatter,
    },
  ];

  const audioLists = audioList1
  const options = {
    className: 'music-class',
    audioLists: audioList1,
    defaultPlayIndex: 0,
    theme: 'dark' as ReactJkMusicPlayerTheme,
    mode: 'full' as ReactJkMusicPlayerMode,
    bounds: 'body',
    quietUpdate: false,
    clearPriorAudioLists: false,
    autoPlayInitLoadPlayList: false,
    preload: false,
    glassBg: true,
    remember: false,
    remove: true,
    defaultPosition: {
      right: 100,
      bottom: 120,
    },
    once: false,
    autoPlay: false,
    toggleMode: true,
    showMiniModeCover: true,
    showMiniProcessBar: false,
    drag: true,
    seeked: true,
    showMediaSession: true,
    showProgressLoadBar: true,
    showPlay: true,
    showReload: true,
    showDownload: true,
    showPlayMode: true,
    showThemeSwitch: true,
    showLyric: true,
    showDestroy: true,
    extendsContent: null,
    defaultVolume: 1,
    playModeShowTime: 600,
    loadAudioErrorPlayNext: true,
    autoHiddenCover: false,
    spaceBar: true,
    responsive: true,
    mobileMediaQuery: '(max-width: 500px)',
    volumeFade: {
      fadeIn: 0,
      fadeOut: 0,
  },
  };
  const params = {
    ...options,
  }


  return (
    <Styled.Layout>
      <Styled.Title>
        Music Queue <Badge variant="primary">peepeepoopoo</Badge>
      </Styled.Title>
      <Styled.DataGridWrapper>
        <DataGrid<Song, "title", {}>
          rows={songs || []}
          columns={columns}
          rowKey="title"
          headerRowHeight={44}
          rowHeight={110}
          onRowClick={({}, row: Song) => openInNewTab(row.url)}
        />
      </Styled.DataGridWrapper>
      <Styled.MusicWrapper>
          <ReactJkMusicPlayer {...params}/>
      </Styled.MusicWrapper>
    </Styled.Layout>
  )
};

export default MusicQueue;
