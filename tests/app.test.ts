import { envs } from '../src/config/envs';
import { Server } from '../src/presentation/server';

jest.mock('../src/presentation/server')

describe('Testing App.ts', () => {
  it('should work', async () => {
    await import('../src/app');
    expect(Server).toHaveBeenCalled();
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      routes: expect.any(Function),
    });
    expect(Server.prototype.start).toHaveBeenCalled();
    expect(Server.prototype.start).toHaveBeenCalledWith();
  });
});
