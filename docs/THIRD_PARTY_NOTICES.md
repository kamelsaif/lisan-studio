# Third-party notices

The MIT License in this repository applies to the original Lisan Studio code and documentation. Third-party dependencies, tools, voices, and services retain their own licenses and terms.

## Dependencies

Dependency versions and license metadata are recorded in `package-lock.json`. Each installed package also carries its own notices. In particular, the application uses Express, Axios, Multer, form-data, esbuild, ffmpeg-static, and @ffprobe-installer/ffprobe.

FFmpeg and FFprobe executables are installed as platform-specific dependencies; this repository does not distribute those executables. FFmpeg licensing depends on the build configuration. See [FFmpeg's license information](https://ffmpeg.org/legal.html) and the notices in the installed packages before redistributing a packaged application that includes binaries.

## Demo media

`public/sample.mp4` is an original 20-second English training clip created for this project. Its script and slide graphics can be reused under the project's MIT License. `test/fixtures/reference.wav` contains its English synthetic speech and is used only as a mock-provider audio fixture. Neither file is a generated Arabic dub or a recording of the project owner.

The sample speech was generated locally with the Flite SLT stock synthetic voice. It uses no voice clone and no paid generation service. See the [Flite project](https://github.com/festvox/flite) for engine and voice notices. No Flite engine or voice model is distributed in this repository.

## ElevenLabs

ElevenLabs is an external service. Users supply their own account and API key. The project's MIT License does not grant ElevenLabs credits, API access, rights to third-party media or voices, or an exemption from the provider's terms. ElevenLabs names and logos belong to their respective owner. This is an independent project, not an official ElevenLabs product.
