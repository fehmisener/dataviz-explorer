import csv
import random


def generate_data(filename, num_points):
    with open(filename, "w", newline="") as csvfile:
        fieldnames = ["time", "voltage", "current"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for i in range(num_points):
            time = i
            voltage = random.uniform(0, 10)
            current = random.uniform(0, 5)
            writer.writerow({"time": time, "voltage": voltage, "current": current})


if __name__ == "__main__":
    num_points = 1000000
    filename = "data.csv"
    generate_data(filename, num_points)
    print(f"CSV file with {num_points} data points generated successfully: {filename}")
