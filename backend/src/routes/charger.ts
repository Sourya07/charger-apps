import { Response, Router } from 'express';
import { Station } from '../db';
import { userMiddleware, AuthenticatedRequest } from '../middleware';
import mongoose from 'mongoose';

const router = Router();

router.use(userMiddleware);





// Create
router.post('/Create', userMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const station = new Station({
            name: req.body.name,
            location: {
                latitude: req.body.location?.latitude,
                longitude: req.body.location?.longitude,
            },
            status: req.body.status,
            powerOutput: req.body.powerOutput,
            connectorType: req.body.connectorType,
            user: new mongoose.Types.ObjectId(req.userId),
        });
        await station.save();
        res.status(201).json(station);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// Read (list all)
router.get('/', async (req, res) => {
    const stations = await Station.find();
    res.json(stations);
});

// Update
router.put('/:id', async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const station = await Station.findOne({ _id: req.params.id, user: req.userId });

        if (!station) {
            return res.status(404).json({ message: 'Not found or unauthorized' });
        }

        station.name = req.body.name ?? station.name;
        station.location.latitude = req.body.location?.latitude ?? station.location.latitude;
        station.location.longitude = req.body.location?.longitude ?? station.location.longitude;
        station.status = req.body.status ?? station.status;
        station.powerOutput = req.body.powerOutput ?? station.powerOutput;
        station.connectorType = req.body.connectorType ?? station.connectorType;

        await station.save();
        res.json(station);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const station = await Station.findOneAndDelete({ _id: req.params.id, user: req.userId });

        if (!station) {
            return res.status(404).json({ message: 'Not found or unauthorized' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;