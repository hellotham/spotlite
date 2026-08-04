---
title: 'Microsoft Windows XP Media Center Edition 2005'
description: 'A review of the Microsoft Windows XP Media Center Edition 2005 for MichaelDVD.'
pubDate: 2004-11-07
categories:
  - 'Published articles'
  - 'Hardware reviews'
  - 'Audio and video'
tags:
  - 'Hardware review'
  - 'Home theatre PC'
  - 'Windows'
  - 'Digital television'
  - 'Home theatre'
---

_This review was written by me for **MichaelDVD**, an Australian DVD review site that is no longer online. A capture of the site is held by the Internet Archive: **[browse it there](https://web.archive.org/web/20220217040146/http://www.michaeldvd.com.au/)**. It is reproduced here from my own copy of the site, as part of the record of what I have written. The published page illustrated this review with photographs of the NAD T513, left behind when it was copied from that review; they are not reproduced here._

Those of you who have read my latest reviews of www.michaeldvd.com.au will realise I'm now using a custom-built Home Theatre PC running **Microsoft Windows XP Media Center Edition 2005**(or "MCE2005" for short).

What is MCE2005? Well, it's basically a version of Windows XP Professional Edition with Service Pack 2, but bundled together with an application called _Media Center_ that provides the following functions:

- Watch, pause and record analog/digital TV "over the air"
- Listen to and record radio (over the air or Internet-based) with an integrated Electronic Programme Guide (EPG)
- Play DVDs and CDs
- Rip CDs onto the hard disk
- View pictures and videos in a variety of formats
- Limited web browsing ("Online Spotlight")

Media Center (the use of the American spelling of "centre" is unfortunately prevalent in MCE2005) is optimized to look good even on low resolution TVs and is best driven via a remote control. In addition, MCE2005 supports synchronising with portable media centers and can serve content to Windows Media Center Extender devices. MCE2005 contains all the features of Windows XP Professional SP2 except for the ability for a computer to join a domain (this would apparently interfere with the ability to support Extender devices).

Microsoft also makes a big deal about the DVD burning capability (integrated with Movie Maker 2.1) but there is no easy way of burning recorded TV programmes (possibly intentional, due to copyright concerns).

Previous versions of Media Center Edition were only available in the US and parts of Europe. MCE2005 is the first version that is officially released in Australia. However, you can't buy a copy of the operating system off the shelf, it is only available bundled with a preconfigured PC.

If you are really keen on building your own MCE2005 PC rather than buying a pre-assembled one, it is possible. Several online web sites (including www.auspcmarket.com.au) are willing to sell you the OEM (original equipment manufacturer) version of MCE2005, plus the accompanying remote control kit, provided you also buy at least one other PC component from them (such as a motherboard, CPU, video card or hard disk).

Why build your own MCE2005 PC? Well, there are several reasons:

- You get to choose your preferred set of components, optimized for your requirements.
- You can take advantage of latest hardware releases and driver updates.
- It's fun learning experience.

Why buy rather than build?

- Someone has tested to make sure everything works together.
- You get support if there is a problem.
- You avoid the risk of damaging the components whilst trying to install them.

## What's so special about MCE2005 over a "normal" HTPC?

Well, first of all, there is no such thing as a "normal" Home Theatre PC (or "HTPC" for short). HTPCs are just "normal" PCs that happen to be used for home theatre applications. They can run any operating system (eg, Windows or Linux), plus software for playing DVDs and software/hardware for watching/recording radio and TV. In addition, some HTPC users choose to use a front end application such as myHTPC/Meedio and XLobby (plus remote controls and automation programs such as Girder) to make the HTPC "living room" friendly.

Arguably the user interface of Media Center is no more powerful, or easier to use than comparable HTPC front ends. There are plenty of DVD player, programs, with the two most popular ones (Intervideo WinDVD and Cyberlink PowerDVD) now in their sixth generation and supporting formats like DVD-Audio and featuring all sorts of video-enhancing features. What makes MCE2005 so special, since it lacks the advanced features and customisability of existing third party software?

One of the biggest benefits of MCE2005 over a do-it-yourself HTPC is proper support for "Studio RGB'", as opposed to computer RGB. Most PCs operate using Computer RGB, which means Black is (R,G,B)=(0,0,0) and White is (255,255,255). In the digital video world, however, things are a little different. For a start, video is encoded using YCrCb rather than RGB. ITU-R Recommendation BT.601-4 states that when YCrCb is converted to RGB, Black should be encoded as (16,16,16) and "Reference" White as (235,235,235). This is sometimes called "Studio RGB."

Many HTPC applications and video drivers do not support Studio RGB. Indeed, many will convert YCrCb to Computer RGB, which causes crushing of below black and above white levels. A common example of use of below black levels is the PLUGE signal on many video calibration images. Even worse,different software components in the playback chain may make different and conflicting assumptions about colourspaces, providing a non-optimal final result that is neither Computer nor Studio RGB.

MCE2005 out of the box, when used with certified MPEG decoders and video drivers, fully supports Studio RGB throughout the entire video chain. This includes desktop themes and the Media Center user interface.

Another big advantage of MCE2005 is the avoidance of tearing of video frames. One of the disadvantages of HTPCs over consumer video equipment is the lack of synchronization between video frames and video display refresh rates. This is particularly noticeable when displaying high resolution video. MCE2005 uses a customised allocator presenter over VMR9 (Video Mixing Renderer 9, the most advanced renderer in DirectX 9) to avoid visible tearing.

The major drawbacks of MCE2005 in comparison to third party applications are the sort of drawbacks you would expect given that it comes from Microsoft: lack of customisability, use of proprietary formats, and a fairly draconian implementation of digital rights management.

MCE2005 out of the box is not user customizable at all, apart from the setup settings accesible from within Media Center. If you build your own MCE2005 machine, you can choose your own software components, drivers and decoders, but that's about all. If you use the Software Development Kit, you can further customise the Media Center menu items and add your own plug-ins. However, many die-hard HTPC enthusiasts lament the lack of the ability to fully customise the playback chain, such as the ability to add video processing filters (such as the open source ffdshow).

TV recordings are in a proprietary DVR-MS format rather than standard .MPG. Furthermore, if the copy protection flag is set in the TV broadcast, these files can only be viewed on the machine that originally recorded the content. However, there are utilities that will convert DVR-MS files to standard MPEG-2. Far more serious is the restriction on component video output. If your graphics card supports component video output, then MCE2005 will not display copy protected DVDs at a resolution higher than 480p. Good-bye scaling to native display resolution on HDTVs!

From my perspective, the two major technical benefits (Studio RGB support, plus no video tearing) outweigh the disadvantages, so I have decided to build my own MCE2005 PC based on currently available components.

## Choosing the right MCE2005 hardware and software components

Microsoft's minimal requirements is a PC configuration with a CPU of at least 1.6GHz, 256MB memory, 60GB hard disk and a 64MB graphics card, with a DVD-ROM drive and a modem connection to the Internet. Yeah, right. Of course, it's possible to run MCE2005 on such a machine, provided you are not interested in watching HDTV.

For optimal performance, Microsoft recommends a special form-factor PC (preferably designed using low noise components) with at least a 3.0GHz CPU (especially if MPEG-2 is encoded and decoded without hardware accelersation), 512MB memory, as large a hard disk as you can afford, an audio card that can output analog 5.1 and SP/DIF simultaneously, and a 128MB AGP 4X graphics card supporting DVI as well as analog video outs (composite and S-Video). In addition, Microsoft strongly recommends a TV tuner card, the special Microsoft-designed remote control, a broadband Internet connection, a DVD writer, a media card reader and front panel status display and controls.

I chose the following hardware components for my MCE2005 system:

| Component | What I bought | Rationale | What I bought | Price Paid (A\$) |
| :-- | :-- | :-- | :-- | :-- |
| CPU | Meet the minimum requirements for Windows XP | Equivalent operating frequency of 1.6GHz without software encoding. If software encoding is supported, processors should have a minimum equivalent operating frequency of 3.0GHz | Intel Pentium 4 530 (LGA775 3.0MHz) |  |
| Hard Drive | 60GB | The larger the hard drive, the better! Larger hard drives installed in the computer provide more storage space for recorded content. | Seagate Barracuda 7200.7 200GB |  |
| Memory | 256MB | To support scenarios where the Media Center Edition User Interface is accessed remotely across a network using the Media Center Extender products, 512 MB minimum is highly recommended More memory provides a better user Experience!! | 512MB |  |
| Graphics Card | 64MB DDR | 128MB or more, DDR (or better) With TV-out and/or DVI � **4x AGP or equivalent**� **Graphics Memory: 48 MB**� **DirectX VA compatible hardware acceleration**� **Motion Compensation for MPEG-2 decode assist**� **Video de-interlacing: BOB**� **DXVA_DeinterlaceTech_BOBLineReplicate or ****DXVA_DeinterlaceTech_BOBVerticalStretch return value****from the DXVA_DeinterlaceCaps interface \***_.\**� **Software-controlled video positioning**� \**If present, TV out circuitry capable of downscaling a_***1024 x 768, 32bpp desktop to NTSC-M/J, PAL, ****or SECAM** Ÿ **Good graphics accelerator features**� **Analog and digital connectors**� \**Advanced, DirectX VA compatible hardware acceleration and\****video de-interlacing\**� **iDCT or VLD**� **Windows Media Video 9 (WMV9)**� **High quality, pixel adaptive de-interlacing**� **Support for De-Interlace BltEX**� **New YUV blending mode with lowered video bandwidth requirements**� **Sufficient video memory (128 MB) and bandwidth (10 GB/s) for\****HDTV decode\**� **TV out connector assignable to unique display controller**� **Correct S-Video black level: 0 IRE for RGB (16,16,16)** � **Support for EIA-861B timings for DTV displays and\****59.94Hz for NTSC displays\**� **Screen resolution matched to native display resolution**� **No visible artifacts on video scaled to desktop resolution**� **Preserved video head and toe room for accurate\****color reproduction\**� **�Guaranteed video�: User always sees video**� **Detect how the user has plugged in video (i.e., VGA or\****S-Video) and switch to it**� **DDC/CI**� **HDCP** | Leadtek WinFast PX6600 TD 128MB |  |
| DVD Drive | **DVD-ROM\****Drive** | **DVD Recorder Drive** | LiteOn XJH-165H |  |
| Internet Connection | **Modem\****Connection** | **Broadband Connection, where\****available** | BigPond Cable |  |
| TV Tuner | optional | � **Analog Tuners**� **Implemented as WDM Streaming Capture Device**� **Kernel Streaming or AVStream (recommended)**� **Audio and video capture on same physical device**� **A/V noise suppression during channel changes**� **Digital Tuners (DVB-T)**� **Implemented using Broadcast Driver Architecture (BDA)**� **Analog/Digital solutions**� **The user will be prompted to choose analog or digital during\***_TV setup\*_ Ÿ **Good analog TV tuner features**� **Accurate NTSC/PAL decoding**� **Correct black levels: Conformance to ITU Rec 601 colorspace**� **3D Y/C separator: Video free of dot crawl, comb filter artifacts**� **High signal to noise ratio on video and VBI signals**� **Appropriate level of filtering to reduce analog noise without\****distorting the video's appearance**� **High quality raw VBI data**� **High sample rate: 1440 samples/second or higher**� **Proper gain, waveform, and capture all of lines 1-23**� **FM tuner**� **If implemented, connector must be separate from TV connector** |  |  |
| DVD Decoder |  | nVidia Forceware 4.00.29 or higher Ÿ **Decodes MPEG-2 to produce output video frames**Ÿ **Requirement highlights**� **Compatible with the DirectX VA interfaces by supporting off-host processing of\****motion compensation and video de-interlacing\**� **DirectShow property page for audio configuration from inside\****Windows Media Center**Ÿ **Good decompressor features**� **Quick MPEG-2 decode (<16ms) to prevent frame drops/glitches**� **iDCT or VLD MPEG-2 decode acceleration via DirectX VA**� **Smooth fast forward/rewind and quickly resume to 1x playback**� **�Media Center Compatible� registry key**� **\[HKEY_CLASSES_ROOT\CLSID\{083863F1-70DE-11d0- ****BD4000A0C911CE86}\Instance\{Your Decoder CLSID here}\Capabilities\]****"{374ac4df-7c98-4257-b13d-36087dbee458}"=dword:00000001** | nVidia Forceware 4.00.29 |  |
| Media Card Reader | optional |  | Apacer |  |
| Remote Control/IR Receiver | optional |  |  |  |
| Display Device |  | Ÿ **Good display features**� **Compliance with �Designed for Windows� logo**� **High native resolution**� **At least 1024x768 for 4:3 and 1280x720 for widescreen aspect\****ratios\**� **High brightness, contrast ratio for noise free, pristine\****video\**� **No motion blur or trails on moving objects**� **LCD response time << 16 ms** � **Capable of �natural� color, pre-calibrated for user**� **6500K Color temperature**�\**White point (RGB 235) and black level (RGB 16)****set for video**� **Easy to adjust, accessible controls for\****brightness and contrast**� **Proper EDID formatting for Plug and Play support**� **DDC/CI support**� **DVI input** |  |  |
| Audio |  | Ÿ **Good audio solution features**� **Multi-channel output (5.1 and more)**� **Analog � decode of WMA Pro and DVD audio formats**� **S/PDIF � pass through of DVD audio formats**� **High quality components laid out properly for clean,****noise-free analog output**� **�Guaranteed audio�: User always hears audio**� **Output both analog and digital audio simultaneously**� **Or detect how audio is plugged in and switch**� **Connectors appropriate to the environment**� **RCA versus 1/8� in the living room** |  |  |
| Front panel display | optional | Ÿ **Beyond �PC status� (power and hard drive)**� **Can be problematic (constantly flashing HD light?)**Ÿ **Media status is most meaningful to users**� **TV recording status, channel number, song title, \****chapter, and so on**Ÿ **Display can be simple indicator lights, or scale\****to pixel-addressable displays**� **Consider a design that can fit in an open drive bay**� **great add-on opportunity for traditional\****form factors** |  |  |
| Front panel controls | optional | Ÿ Provides additional input options on appropriate form factors (i.e., Living Room PC) � Enables the MCPC to appear and behave more like Consumer Electronics device � Examples: Transport controls (play, rewind), Navigation (down, left, enter), Volume Ÿ Recommendations � Implement driver using Human Interface Device (HID) � Driver converts input in to the right message � WM_ INPUT, APPCOMMAND, KEYDOWN, KEYPRESS, KEYUP � Implement as HID USB device to simplify development � We don't recommend doing a user mode solution � Build to meet the same HID usages as the remote control � Separate buttons (combining increases driver complexity) � �Play� & �Pause�; �Fast Forward� & �Next�; �Stop� & �Eject� |  |  |
| Noise level |  | Ÿ Expectations are higher as Media Center PCs enter new rooms and new scenarios Ÿ Recommendations � Most obvious: Choose quiet components� � Fanless components � Fluid bearing drives � Quiet fans for case, CPU, and power supply � Manage heat differently � Larger fans that turn more slowly � Passive cooling with heat sinks and heat pipes � Case designed for good air flow � Reduce un-necessary noise � No fan while in standby � Control fan spin-up at system resume � No case rattles � Rubber mount hard drives |  |  |

l **Motherboard and Processor Installed**l **Installing Memory**l **Installing Video, Tuner, Sound, & Firewire/USB Cards**l **7-in-1 Media Reader Installed**l **Installing DVD Recorder Drive**l **Connecting Front USB**l **Connecting Front Firewire**l **Connecting Serial Hard Drive cable to motherboard and Hard Drive**l **Connecting EIDE controller cable to motherboard and DVD Recorder Drive**l **Connecting Power Supply to Video, Firewire/USB, Fan, LCD Display, Hard\****Drive, DVD Recorder and 4-Pin & 20-Pin connectors to Motherboard**

Although MCE2005 is based on Windows XP, it does have some fairly stringent requirements for a graphics adapter, so if you are building your own MCE2005 PC, you should probably try and use an adapter that supports the following:

Enough bandwidth to support HDTV resolutions

EIA-861B timings for DVI displays

TV resolutions/aspect ratios

Hardware support for DXVA acceleration (iDCT) and deinterlacing

Conformance to ITU Rec 601 colorspace (for example: 0 IRE is defined as RGB 16,16,16)

I chose a card based on nVidia's GeForce 6600 chipset. nVidia's driver supports defining a custom resolution that matches the native display resolution and refresh rate of my Sony VPL-VW11HT projector (1366x768 at 56Hz), plus the driver implements pixel adaptive deinterlacing in hardware. The graphics chipset also supports hardware assisted MPEG 2/4 encoding and decoding, as well as WMV decoding, but the current driver does not yet support many of these functions.

Limitations:

Does not support playback of DVDs via component output at resolutions higher than 480p

The review unit I received seemed to be a production unit, and it came in a box weighing 4kg. Inside the box were:

- the player itself, with a "captive" power cord with an Australian 2-pin plug
- a remote control
- an RCA 3-core audio/video cable cable (composite video, left and right audio)
- an owner's manual and service locations listing

The review unit is in NAD's traditional dark grey colour, and anyone who is familiar with NAD's product designs will be very familiar with the rounded buttons and sparse, minimalistic look.

The player is fairly small and light, with a construction quality not too far removed from "supermarket special" DVD players except it's based on a metal chassis rather than plastic. In operation, the review unit has a slightly faulty transport: whenever the tray is opened, it has a tendency to automatically retract the tray within a few seconds, and before a disc could be inserted/removed/replaced. I suspect this is because the opening action is a bit too forceful, thus when the tray hits the fully opened position, the sudden and forceful stop triggers the automatic closing mechanism. I hope this fault is not a common one, or at least easily remedied.

Opening up the unit revealed a logical layout, with the power supply (left), the transport unit (middle), and on the right a single board housing the majority of the electronics. There is a small circuit board at the back (behind the transport) that outputs SCART (composite and RGB).

Inspecting the chipset reveals a very basic design similar to that found in many cheap "Made in China" DVD players - nearly all the transport and decoding logic is provided by a pair of MediaTek chips: the MT1379DEC "DVD Player on a single chip" and the MT1336E transport controller. The video driver (combination DAC and amplifier) is a Mitsumi MM1623 which supports 6 channels with 10-bit/54MHz resolution. However, it is clocked by a KITEL 338 27.000MHz oscillator, so I suspect the MM1623 is only operating at 27MHz instead of 54MHz.

In homage to NAD's reputation for good quality audio, the audio stage is based on superior components to that typically found in cheap and nasty DVD players. The audio DAC is a 4391K 2 channel delta sigma design, feeding a 2604AU dual channel op amp.

Other chips include the usual memory chips (two Hynix HY57V161610DTC 16Kbits DRAMs and an AMD 29LV800 flash memory).

## Front Panel

The front panel consists of:

This is a good design, and does not look too cluttered whilst allowing the majority of disc navigation to be performed on the front panel without a remote control - very handy if you can't find the remote! I would have liked the buttons to be a little more differentiated, but I understand NAD's desire for design consistency across their entire range.

The front panel display is has bright cyan LEDs with some annunciators in orange:

Nice and minimalistic, although the animated "spinning disc" is a bit cheesy.

## Rear Panel

��� The rear panel contains all the usual jacks:

NOTE: there is also a SCART connector (supporting composite and RGB) in the centre which is not shown in the above diagram. The inclusion of a 12V trigger is unusual at this price point.

## Remote Control

The remote control is designated DVD 5:

The remote control is another area where NAD's careful attention to usability puts them a level above their mass market competitors. This is not the prettiest looking remote, and it is certainly not the smallest, but it's fairly usable. A backlight would help, plus buttons that are more differentiated, but it has more or less has an appropriate set of buttons, and all of them behave very much like you would expect them to. The "Next Disc" button is of course not functional on this player, but the others are. Most of the buttons are shift toggles - pressing them repeatedly will shift across multiple available states, eg. pressing the ANGLE button cycles through available camera angles, AUDIO cycles through available audio tracks etc.

## Manual

The manual is multilingual and divided into two A4 sized volumes, each containing 4 versions of the manual in different languages. Volume 1 has versions for English, French, German, and Dutch. Volume 2 has versions for Italian, Spanish, Portugese and Swedish. The English version is 29 pages. It is crisp and succinct, and contains the minimal information to get you going, but frankly, after the initial setup you probably won't need it.

## Set-Up Menu

The set-up menu is accessed by pressing the Setup button which brings up a list of setup parameters. You navigate across parameters by pressing the up/down arrow keys. To change specific parameter, you select the right arrow key, then use the up/down arrow keys to select the desired setting, followed by pressing ENTER to confirm your selection. You can exit the set-up menu by pressing SETUP, RTN or PLAY keys.

The set-iup menu contains the following parameters:

- Disc Audio (selects the preferred audio track in the language of your choice, default is "Original")
- Disc Subtitle (selects the preferred subtitle track to enable, default is none)
- Disc Menu (selects the preferred menu to display, default is "Original")
- Rating (sets the appropriate level of parental control)
- Country Code (sets the appropriate country code for interpreting parental control ratings)
- TV Aspect (4:3 letterbox, 4:3 panscan, 16:9 wide)
- Menu language (selects language used for the set-up menu)
- Progressive Scan (on/off)
- Digital audio output (Dolby Digital/PCM, Stream/PCM, PCM, Sample Freq 48kHz/96kHz)
- Others (Dynamic Range Control, Play Back Control, Auto Play) (On/Off)

There are two additional set-up parameters not available from the set-up menu. Pressing and holding the PAUSE button on the front panel for over 5 seconds with no disc in the tray toggles the player video output settings (AUTO, PAL, NTSC). Pressing and holding the DISP button for 3 seconds whilst a disc is playing toggles the progressive scan mode:

- Mode 1 (Auto)
- Mode 2 (weave)
- Mode 3 (bob)

I would have liked to see a black level setting (IRE 0/7.5).

## Video Playback

I calibrated the player by adjusting the display settings of my Sony VPL-VW11HT LCD projector (and leaving the Picture Mode of the DVD player on "Standard") using the [_Digital Video Essentials_](http://www.videoessentials.com) test disc (PAL/NTSC) plus the older _Video Essentials_(NTSC). The player's video output must be close to reference levels, for the optimal adjusted settings were the same as the default settings.

I only tested the player in progressive scan mode (for both PAL and NTSC titles). I did briefly put the player in interlaced mode to verify that it outputs interlaced video correctly.

The review unit is multi-region enabled and I had no difficulty playing a number of Region 1, 2 and 4 discs (including R1 RCE discs). Even discs that do not play properly on my old player - the Pioneer DV-626D - (including _When Harry Met Sally_and the layer change of several discs including _Fried Green Tomatoes_) play perfectly fine on the DVD-2900. I am not sure whether retail units will be multi-region enabled out of the box.

Given that this is effectively an "entry level" player for NAD that is not too dissimilar to bargain priced players, the quality of the video output is only average. However, unless you are very very picky (and have a very high resolution display) you will probably not notice most of the problems and the player should perform adequately on most TVs (especially if progressive scan is not used).

The player performed okay on most of the tests in _Digital Video Essentials_. It passed through all the picture resolution patterns (Title 13) with no problems. It also performed adequate on the _Snell and Wilcox Anamorphic Zone Plate_motion patterns (Title 16). It performed the A/V timing test in Title 11 with no issues, indicating that the player should not have any problems with lip sync and audio synchronization.

Resolution of still images are perfect, and the player pixelates on very fast moving low level detail (as evidenced by the computer generated animation in _Digital Video Essential_'s video montage - Title 17 Chapter 2). For example, there's quite a lot of shimmering and moire patterns around Daryl's tie (worn by Freddy) at 20:52-21:37 in the R4 edition of _Double Take_.

The player is also fairly susceptible to ringing, and will accentuate Gibb's effect and edge enhancement artefacts.

Slow pans were reasonably smooth and marred only by the occasional micro-stutter.

At first I did not notice any signs of chroma issues, such as the chroma upsampling error or interlaced chroma upsampling artefacts. However, upon very close inspection during the (animated) main menu of the Region 1 release of _Saturday Night Fever_, I did notice that there are vestiges of jagginess in the pulsating red boxes - so, the MediaTek MT1379 is probably applying some sort of filter on the chroma channels. Slight jagginess can also be noticed due to interlaced chroma upsampling, for example the animated menu for the R1 edition of _The Hunt For Red October_.

One annoying fault I did notice is presence of colour banding on bright backgrounds that are rapidly changing in luminosity - this is noticeable in the fast motion sequence of clouds on top the a mountainside scenery at the beginning of the _Digital Video Essentials_video montage. and during the opening titles of the R4 edition of the remake of _The Thomas Crown Affair_. Once I noticed it I saw it everywhere, particularly during scene fade ins and fade outs.

In summary then, the player's video output quality is by no means "State Of The Art", but it's close enough, at least on the basics such as resolution, colour accuracy and smoothness. Many of the faults exhibited by this player are only noticeable to the trained eye, on a high resolution display.

## Progressive Scan

The player fully supports both NTSC and PAL progressive scan, but only on the component video output. If SCART RGB is selected, the progressive scan option is actually disabled on the set-up menu, which confused me initially.

The progressive scan implementation is rather poor, and I noticed progressive scan combing artefacts quite often - in menus, and video based material. I suspect the player is flag-based rather than cadence reading, and is very prone to weaving incorrect half frames. The colour banding problem that I noticed is probably a side effect of the poor progressive scan implementation. I would recommend prospective buyers of this player not to bother with progressive scan and use the player only in interlaced mode.

## On Screen Display

The on-screen display is accessed while the DVD playing by pressing the DISP button on the remote control. It's pretty basic and features two lines of text. The following information is displayed on-screen for DVD-Video discs:

- Title (Current/Total)
- Chapter (Current, Total)
- Title Elapsed in HH:MM:SS
- Audio language (Track number, track language, encoding format, no. of channels)
- Subtitle track
- Angle (Current/Total)
- Sound (Norm/3D Sur)

I would have liked to see Remaining/Total Time (title or chapter) as well as a bitrate indicator.

The arrow keys can be used to change/directly navigate the title/chapter/time/audio/subtitle/angle whilst the on-screen display is showing. In addition, the numeric keypad can also be used. I thought this is a nice touch, since the player does not have dedicated title/chapter/time selection buttons. It does mean, however, that direct title/chapter access is not possible without a video display. The on-screen display is also the only place where the virtual 3D surround mode can be engaged.

## Standards Conversions

The player fully supports conversion from PAL to NTSC and NTSC to PAL. It does both very well, with minimal pixelization and only occasional judder. In fact, the player defaulted to converting NTSC to PAL and I didn't even realise it until I checked the projector status display.

The player can be set to selectively convert from Dolby Digital/dts/MPEG to PCM on the digital out connections. It will also downsample 96kHz PCM to 48kHz if you want.

## Other formats

The player had no problems playing a selection of CD-R and CD-RW discs that I inserted into it, including gold and blue/green discs recorded at various speeds. It was able to correctly recognize CD-Rs and CD-RWs containing:

- PCM audio tracks ("Redbook" format)
- dts music CD (encoded in pseudo "Redbook" format)
- ISO9660 CD-ROM containing MP3 audio files
- ISO9660 CD-ROM containing JPEG image files

The player also had no problems with various recordable DVDs that I threw at it (including all four variants: -R, -RW, +R, +RW) but the player did not recognise a DVD+R Dual Layer disc burnt using the "DVD+R" booktype. I suspect this is a firmware problem in which case it may be fixable. This is a fairly serious limitation given that many first generation dual layer burners do not support changing of book types.

In addition, the player had no problems recognizing the following types of commercially pressed discs:

- Video CD ("_James Bond: The Man With The Golden Gun_")
- DVD-Video containing PCM 96/24 audio track (also known as a "Digital Audio Disc" or DAD) ("_Casino Royale_")

## MP3 and JPEG Playback

The player has a good MP3/WMA/JPEG playback implementation, although ISO9660 formatted CD-Rs took more than a few seconds to read. You have to manually choose whether to scan a disc as a collection of MP3/WMA files or as a set of JPEG images. Like most players, the user interface consists of a "Windows Explorer"-like on-screen display of folders and tracks. The navigation keys can be used to navigate in and out of folders and to select files to play. The player even reads multi-session discs correctly on both CD-R and CD-RW and allow you to select which session you want to read. The player seems to recognize long (Joliet) file names.

| Test Disc Format | Results |
| :-- | :-- |
| CD-R >100 MP3s (128 Kb/s) in multiple, nested subdirectories | Found all files |
| CD-R >100 MP3s (128 Kb/s) in root directory | Found all files |
| CD-R with MP3s (CBR ranging from 20-320 Kb/s, VBR ranging from 1%-100% quality), 1 WMA and 1 WAV file | Successfully played all constant bit rate files between 24-320 Kb/s. Does not recognize CBR files with bitrates less than 24Kb/s. Recognized and successfully played all VBR files. Recognized and successfully played the 160Kb/s WMA file but did not recognize the WAV file. |
| Multisession CD-RW (2 sessions each containing MP3 files) | Found all files in both sessions |

The player's JPEG image display capability allows you to view JPEG still images (presumably scanned from your photo album or taken using a digital camera) burned onto an ISO9660 CD-R. The implementation is very similar to the MP3 playback menu - showing folders stored on the disc and filenames of images with a .JPG extension. It can display successive images in a slide show with programmable delays between images.

JPEG files were displayed scaled to NTSC or PAL resolution. In addition to navigating between images, the pictures can also be rotated using the left and right cursor keys and flipped horizontally/vertically using the up/down keys.

## Audio Playback

The strength of the player is undoubtedly the quality of the (alas) stereo only analog audio.

Even without any burn-in, the player exhibited the classic NAD "house sound": it's warm, rich and luscious, with a spacious soundstage. It should complement NAD amplifiers very well, and will help add warmth to cold and sterile set-ups.

Again, the limitations of the sound are only noticeable when compared against a much more expensive player. The player smears very low level detail, and slightly dampens transients.

Given that a fair number of buyers are likely to connect the player via digital audio output to a surround processor or receiver, they will not care about the analog audio quality. However, it is nice to know that the player will act as a decent stereo only player.

The specs are not terribly impressive, with only a 100dB S/N ratio and 95dB dynamic range (which explains why dynamic transients sound slightly dampened) - this corresponds to effectively only about 16-17 equivalent bits of resolution, so don't expect to hear a marked improvement with 96kHz 24-bit audio tracks on DVDs.

The player of course will downmix Dolby Digital into 2.0 and will only support dts on the digital out. There is a "3D surround" mode but I did not engage it - this is a proprietary virtual surround processing mode embedded in the MT1379.

Subjectively, the player exhibited some with audio synchronization on known "problem" discs (_Wedding Singer_R4 second remastered edition and also _Matrix_R1). The audio was definitely not synchronized during Steve Buscemi's wedding speech in the former but within acceptable tolerances when Neo is being scolded by his manager for being late at work in the latter.

## Disc Compatibility Tests

��� I tested the player against a number of discs to highlight potential problems: _Specific Tests_

| Disc | What Is Tested | Results |
| :-- | :-- | :-- |
| The Matrix R1 Follow The White Rabbit | Tests active subtitle feature, seamless branching, ability to load hybrid DVD/DVD-ROM and audio sync. | YesYesYesYes |
| Wedding Singer Remaster 2 R4 Audio Sync | Opening scene tests audio sync. | Yes |
| Terminator: SE R4 Menu Load | Tests ability to load complex menu | Yes |
| Independence Day R4 Seamless Branching | Tests ability to handle seamless branching (Chapter 3) | Yes |
| Patriot R1 RCE | Tests ability to handle RCE protected DVDs in Auto multizone mode (if applicable). | Yes |
| Toy Story R1 Chroma Upsampling | Tests for presence of chroma upsampling error (Chapter 3 and 4) | Yes (however vestiges of chroma upsampling error remain post chroma filtering) |

As you can see, the T 513 passes all tests. The chroma upsampling is marginal, but is only noticeable on a high resolution display.

## User Convenience Features

| Screen Saver | Yes |
| :----------- | :-- |
| Zoom         | Yes |

## Overall

### The Good Points

- Decent video quality, although with some artefacts
- Above average audio quality, with the traditional warm/lush "NAD" sound
- Good user interface (front panel and remote control), easy to operate

### The Bad Points

- Occasional problems with tray opening and closing
- No support multi-channel or high resolution audio
- No bookmarks/markers

## Features At A Glance

| Video | Component Output | Yes | RGB Output | Yes |
| :-- | :-- | :-- | :-- | :-- |
| Progressive Scan | NTSC | Yes | PAL | Yes |
| Audio | DTS Output | Yes | MP3 Playback | Yes |
| High Resolution Audio | DVD-Audio | No | Super Audio CD | No |
| CD-R/RW, DVD-R/RW | Yes(although player did not play DVD+R dual layer disc with booktype setting of DVD+R) |  |  |  |
| Conversion | NTSC and PAL conversion |  |  |  |
| Inbuilt Decoder | Dolby Digital, MP3, WMA, JPEG |  |  |  |

## In Closing

The player performed decently enough in the video department, but probably no better than many of the cheap players based on the Mediatek MT1379 (and there are quite a few). It does have a good and listenable audio stage, but only for stereo listeners. Construction quality is okay, but I had a few problems with the disc tray opening and closing.

The target audience for this player would appear to be those who like the NAD brand, or stereo listeners who are interested in listening to the analog audio output. Those who are only interested in video quality can probably grab a cheaper player with equivalent video quality, or alternatively a more expensive player with less artefacts.

## [Ratings (out of 5)](../Ratings.html)

| Performance     | ★★★  |
| :-------------- | :--- |
| Build Quality   | ★★★★ |
| In Operation    | ★★★★ |
| Compatibility   | ★★★  |
| Value For Money | ★★★  |

## Technical Specifications (Manufacturer Supplied)

| Product Type: | DVD-Video, Video CD, Audio CD, MP3/JPEG CD, Kodak Picture CD player |
| :-- | :-- |
| Region: | 2 (multi-region enabled) - although a Region 4 sticker had been applied to the back of the player |
| Signal System: | PAL / NTSC |
| Serial Number Of Unit Tested: | L 3YT51307868 |
| MPEG Decoder: | MediaTek MT1379DEC |
| Audio Frequency Response: | 4 Hz-20 kHz (CD) 8 Hz-44 kHz (DVD 96kHz) |
| Signal to Noise Ratio: | 100 dB |
| Dynamic Range: | 95 dB |
| Total Harmonic Distortion: | 0.008% |
| Dimensions: | 435 mm (w) x 243mm (d) x 67mm (h) |
| Weight: | 3 kg |
| Price: | \$399 |
| Distributor: | Audio Products Australia 67 O'Riordan Street Alexandria NSW 2015 |
| Telephone: | (02) 9669 3477 |
| Facsimile: | (02) 9578 0140 |
| Email: | info@audioproducts.com.au |
