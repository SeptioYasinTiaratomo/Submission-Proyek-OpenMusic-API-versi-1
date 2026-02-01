const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');

// Albums
const AlbumHandler = require('./albums/handler');
const albumRoutes = require('./albums/routes');
const AlbumService = require('./albums/service');
const AlbumValidator = require('./albums/validator');

// Songs
const SongsHandler = require('./songs/handler');
const songsRoutes = require('./songs/routes');
const SongsService = require('./songs/service');
const SongsValidator = require('./songs/validator');

const createServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const albumService = new AlbumService();
  const albumHandler = new AlbumHandler(albumService, AlbumValidator);
  server.route(albumRoutes(albumHandler));

  const songsService = new SongsService();
  const songsHandler = new SongsHandler(songsService, SongsValidator);
  server.route(songsRoutes(songsHandler));

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      return h.response({
        status: 'fail',
        message: response.message,
      }).code(response.statusCode);
    }

    if (response instanceof Error && !response.isServer) {
      return h.response({
        status: 'fail',
        message: response.message,
      }).code(response.output.statusCode);
    }

    if (response instanceof Error) {
      console.error(response);
      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      }).code(500);
    }

    return h.continue;
  });

  return server; // Jangan langsung .start()
};

module.exports = createServer;
