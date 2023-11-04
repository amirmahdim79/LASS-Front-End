import os
import sys

def count_lines_of_code(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
        lines = file.readlines()
        # Exclude empty lines and comments
        lines = [line for line in lines if line.strip() and not line.strip().startswith('//')]
        return len(lines)

def search_directory(directory_path, file_formats, exclude_directory=None):
    total_lines = 0
    report = []

    for root, dirs, files in os.walk(directory_path):
        # Exclude the specified directory from the search
        if exclude_directory and exclude_directory in dirs:
            dirs.remove(exclude_directory)

        for file in files:
            if file.endswith(file_formats):
                file_path = os.path.join(root, file)
                line_count = count_lines_of_code(file_path)
                total_lines += line_count
                report.append((file_path, line_count))

    return report, total_lines

# Get the directory path of the Python script file
directory_path = os.path.dirname(os.path.abspath(sys.argv[0]))
file_formats = ('.jsx', '.js', '.css', '.html')

# Specify the directory to exclude from the search (optional)
exclude_directory = 'node_modules'

# Search directory and generate report (passing the exclude_directory parameter)
report, total_lines = search_directory(directory_path, file_formats, exclude_directory)

# Print report
for file_path, line_count in report:
    print(f"File: {file_path}\nLines of Code: {line_count}\n")

# Print total lines of code
print(f"Total Lines of Code: {total_lines}")