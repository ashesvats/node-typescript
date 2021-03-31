/ we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {

    async listUsers(req: express.Request, res: express.Response) {
        const users = await usersService.list(100, 0);
        res.status(200).send(users);
    }

    async getUserById(req: express.Request, res: express.Response) {
        const user = await usersService.readById(req.params.userId);
        res.status(200).send(user);
    }

    async createUser(req: express.Request, res: express.Response) {
        req.body.password = "dede" // put password hasing
        const userId = await usersService.create(req.body);
        res.status(201).send({ id: userId });
    }

    // async patch(req: express.Request, res: express.Response) {
    //     if (req.body.password) {
    //         req.body.password = await argon2.hash(req.body.password);
    //     }
    //     log(await usersService.patchById(req.body));
    //     res.status(204).send(``);
    // }

    // async put(req: express.Request, res: express.Response) {
    //     req.body.password = await argon2.hash(req.body.password);
    //     log(await usersService.updateById({ id: req.params.userId, ...req.body }));
    //     res.status(204).send(``);
    // }

    async removeUser(req: express.Request, res: express.Response) {
        log(await usersService.deleteById(req.params.userId));
        res.status(204).send(``);
    }
}

export default new UsersController();
