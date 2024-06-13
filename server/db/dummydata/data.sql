INSERT INTO disasterevents (EventName, StartDate, EndDate, EventDescription, EventStatus, EventUrgency) VALUES
('Derecho Storm in the Midwest', '2023-07-10', '2023-07-11', 'Intense windstorm sweeps through the Midwest, causing widespread damage to property and infrastructure.', 1, 4),
('Texas Heatwave', '2022-06-01', '2022-06-30', 'Record-breaking heatwave hits Texas, leading to heat-related illnesses and strain on power grids.', 1, 3),
('Severe Hailstorm in Colorado', '2024-04-05', '2024-04-05', 'Large hailstones pummel Colorado, damaging vehicles, crops, and buildings.', 1, 3),
('Florida Hurricane Season', '2023-06-01', '2023-11-30', 'Multiple hurricanes impact Florida, causing widespread flooding and power outages.', 1, 5),
('Montana Wildfire Outbreak', '2023-08-15', '2023-08-31', 'Several wildfires erupt across Montana, burning thousands of acres of land.', 1, 4),
('New York City Heatwave', '2024-07-20', '2024-07-25', 'Extreme heatwave hits New York City, leading to health advisories and increased energy demand.', 1, 3),
('Arizona Dust Storm', '2023-09-10', '2023-09-10', 'Massive dust storm engulfs Arizona, causing reduced visibility and traffic accidents.', 1, 3),
('Louisiana Flooding', '2022-04-15', '2022-04-20', 'Heavy rains trigger flooding in Louisiana, displacing residents and damaging homes.', 1, 4),
('North Carolina Tornadoes', '2024-03-01', '2024-03-02', 'Multiple tornadoes touch down in North Carolina, destroying buildings and infrastructure.', 1, 4),
('Colorado Avalanche', '2023-02-10', '2023-02-11', 'Large avalanche hits Colorado mountains, blocking roads and posing danger to residents.', 1, 4),
('Hailstorm in Kansas', '2022-05-20', '2022-05-20', 'Severe hailstorm strikes Kansas, causing extensive damage to crops and property.', 1, 3),
('Georgia Thunderstorms', '2024-06-10', '2024-06-11', 'Intense thunderstorms batter Georgia, leading to flash flooding and power outages.', 1, 4),
('Utah Blizzard', '2023-01-05', '2023-01-07', 'Heavy snowfall and blizzard conditions hit Utah, disrupting travel and closing schools.', 1, 4),
('Alabama Tornado Outbreak', '2022-03-15', '2022-03-16', 'Series of tornadoes sweep through Alabama, causing widespread destruction.', 1, 4),
('Oklahoma Wildfire', '2024-09-01', '2024-09-10', 'Wildfire breaks out in Oklahoma, threatening homes and forcing evacuations.', 1, 4),
('Idaho Earthquake', '2023-11-20', '2023-11-20', 'Moderate earthquake strikes Idaho, causing minor damage to buildings and infrastructure.', 1, 4),
('Nebraska Flooding', '2022-07-01', '2022-07-10', 'Heavy rainfall leads to flooding in Nebraska, submerging roads and farmlands.', 1, 4),
('South Carolina Hurricane', '2024-09-15', '2024-09-20', 'Category 2 hurricane makes landfall in South Carolina, causing coastal flooding and damage.', 1, 5),
('New Mexico Sandstorm', '2023-08-01', '2023-08-01', 'Massive sandstorm sweeps across New Mexico, reducing visibility and disrupting travel.', 1, 3),
('Iowa Tornado', '2022-06-20', '2022-06-20', 'Destructive tornado touches down in Iowa, causing damage to homes and infrastructure.', 1, 4);

INSERT INTO DisasterEventLocations (EventId, EventZipCode) VALUES
(1, 50301), (1, 50302), (1, 50303), (1, 50304), -- Derecho Storm in the Midwest (Iowa)
(2, 77001), (2, 77002), (2, 77003), (2, 77004), -- Texas Heatwave (Houston, TX)
(3, 80201), (3, 80202), (3, 80203), (3, 80204), -- Severe Hailstorm in Colorado (Denver, CO)
(4, 33101), (4, 33102), (4, 33103), (4, 33104), -- Florida Hurricane Season (Miami, FL)
(5, 59001), (5, 59002), (5, 59003), (5, 59004), -- Montana Wildfire Outbreak (Billings, MT)
(6, 10001), (6, 10002), (6, 10003), (6, 10004), -- New York City Heatwave (New York, NY)
(7, 85001), (7, 85002), (7, 85003), (7, 85004), -- Arizona Dust Storm (Phoenix, AZ)
(8, 70112), (8, 70113), (8, 70114), (8, 70115), -- Louisiana Flooding (New Orleans, LA)
(9, 27601), (9, 27602), (9, 27603), (9, 27604), -- North Carolina Tornadoes (Raleigh, NC)
(10, 80201), (10, 80202), (10, 80203), (10, 80204), -- Colorado Avalanche (Denver, CO)
(11, 66101), (11, 66102), (11, 66103), (11, 66104), -- Hailstorm in Kansas (Kansas City, KS)
(12, 30301), (12, 30302), (12, 30303), (12, 30304), -- Georgia Thunderstorms (Atlanta, GA)
(13, 84101), (13, 84102), (13, 84103), (13, 84104), -- Utah Blizzard (Salt Lake City, UT)
(14, 35201), (14, 35202), (14, 35203), (14, 35204), -- Alabama Tornado Outbreak (Birmingham, AL)
(15, 73101), (15, 73102), (15, 73103), (15, 73104), -- Oklahoma Wildfire (Oklahoma City, OK)
(16, 83701), (16, 83702), (16, 83703), (16, 83704), -- Idaho Earthquake (Boise, ID)
(17, 68101), (17, 68102), (17, 68103), (17, 68104), -- Nebraska Flooding (Omaha, NE)
(18, 29401), (18, 29402), (18, 29403), (18, 29404), -- South Carolina Hurricane (Charleston, SC)
(19, 87101), (19, 87102), (19, 87103), (19, 87104), -- New Mexico Sandstorm (Albuquerque, NM)
(20, 50301), (20, 50302), (20, 50303), (20, 50304); -- Iowa Tornado (Des Moines, IA)


INSERT INTO Categories (Category, CategoryDescription) VALUES
('Soup', 'Various types of nutritious soups for sustenance'),
('Water', 'Clean and potable water for hydration and cooking'),
('Cereal', 'Breakfast food made from grains'),
('Milk', 'Dairy product rich in calcium and nutrients'),
('Bandage', 'Medical supplies for wound dressing and protection'),
('Shirt', 'Garments worn on the upper body'),
('Pant', 'Garments worn on the lower body'),
('Bread', 'Basic staple food made from flour and yeast'),
('Toothpaste', 'Dental hygiene product for cleaning teeth'),
('Lighter', 'Devices for igniting fire for cooking and warmth');