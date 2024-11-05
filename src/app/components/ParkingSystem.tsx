"use client";

import { useState } from 'react';

interface Vehicle {
  plate: string;
  spot: number;
  timeParked: Date;
}

const ParkingSystem: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [plate, setPlate] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const maxSpots = 10;

  const addVehicle = () => {
    if (vehicles.length >= maxSpots) {
      alert('No parking spots available!');
      return;
    }
    if (plate === '') {
      alert('Please enter a license plate number.');
      return;
    }

    // Find the first available spot
    const occupiedSpots = vehicles.map(vehicle => vehicle.spot);
    const nextSpot = Array.from({ length: maxSpots }, (_, i) => i + 1).find(spot => !occupiedSpots.includes(spot));

    if (nextSpot !== undefined) {
      const newVehicle: Vehicle = {
        plate,
        spot: nextSpot,
        timeParked: new Date(),
      };

      setVehicles([...vehicles, newVehicle]);
      setPlate('');
    }
  };

  const removeVehicle = (spot: number) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.spot !== spot));
  };

  const calculateTime = (startTime: Date): string => {
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes} min ${seconds} sec`;
  };

  const filteredVehicles = vehicles.filter((v) =>
    v.plate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[60%] p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-center text-2xl font-semibold mb-6 uppercase">Parking Management System</h3>

      <div className="flex flex-col md:flex-col gap-10">
        {/* Add Vehicle Form */}
        <div className="w-100">
          <div className="p-4 bg-indigo-50 rounded-md drop-shadow-md ">
            <h4 className="text-lg font-medium mb-2 ">Add a Vehicle</h4>
            <input
              type="text"
              placeholder="Enter a License plate i-e EXB 1234"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-2 outline-none"
            />
            <button
              onClick={addVehicle}
              className="py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 w-32"
            >
              Park Vehicle
            </button>
          </div>
        </div>

        {/* Search and Parked Vehicles */}
        <div className="w-100">
          <div className="p-4 bg-indigo-50 rounded-md drop-shadow-md">
            <h2 className="text-md font-semibold mb-2">Search Vehicles</h2>
            <input
              type="text"
              placeholder="Search by License Plate . . ."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4 outline-none"
            />

            <h4 className="text-lg font-medium mb-2">Parked Vehicles</h4>
            {filteredVehicles.length === 0 ? (
              <div className="border-l-4 border-blue-500 bg-blue-100 p-4 text-blue-700 mb-4 rounded">
                No vehicles parked yet.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Spot</th>
                    <th>License Plate</th>
                    <th>Time Parked</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.spot} className="border-t">
                      <td className="py-2">Spot {vehicle.spot}</td>
                      <td>{vehicle.plate}</td>
                      <td>{calculateTime(vehicle.timeParked)}</td>
                      <td>
                        <button
                          onClick={() => removeVehicle(vehicle.spot)}
                          className="px-3 py-1 bg-red-100 text-red-500 font-medium rounded-md hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {vehicles.length >= maxSpots && (
              <p className="text-center mt-4 px-3 py-1 bg-red-100 text-red-500 font-medium rounded-md hover:bg-red-200">
                No spots available!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSystem;
