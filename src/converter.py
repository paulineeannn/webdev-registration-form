import csv

barangays_by_province = {}

with open('ncr list.csv', 'r') as file:
    for line in file:
        barangay, province = line.strip().split(',')
        province = province.strip()
        province = province[:-1]

        barangay = barangay[1:]

        if province not in barangays_by_province:
            barangays_by_province[province] = []
        barangays_by_province[province].append(barangay)


# Write the barangays to a new TXT file in the desired format
with open('barangay_province3.txt', 'w') as output_file:
    for province, barangays in barangays_by_province.items():
        output_file.write(f'"{province}" : [')
        for barangay in barangays:
            output_file.write(f'"{barangay}", ')
        output_file.write("]")

        output_file.write('\n')