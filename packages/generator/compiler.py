import json

# Example Pseudocode for a basic implementation

class Variable:
    def __init__(self, name, value):
        self.name = name
        self.value = value

def parse_line(line):
    if line.startswith("@variable"):
        # Remove '@variable' and split by '='
        _, variable_definition = line.split('@variable', 1)
        name, value = variable_definition.split('=', 1)

        # Trim whitespace and remove extra characters if necessary
        name = name.strip()
        value = value.strip()

        return Variable(name, value)
    else:
        # Handle other types of lines or syntax
        pass


def convert_to_json(variables):
    # Convert the list of Variable objects to JSON
    return json.dumps({"variables": {var.name: var.value for var in variables}})

def main():
    variables = []
    with open('home.uni', 'r') as file:
        for line in file:
            variable = parse_line(line)
            if variable:
                variables.append(variable)

    json_output = convert_to_json(variables)
    print(json_output)

if __name__ == "__main__":
    main()
