from ply import lex, yacc
import uuid

# Token Definitions
tokens = (
    'GEN_ELEMENT', 'GEN_END', 'GEN_CHILD', 'LPAREN', 'RPAREN', 'VARIABLE', 'EQUALS', 'LBRACKET', 'RBRACKET', 'COMMA', 
    'TEXT', 'STRING', 'NUMBER', 'LCURLY', 'RCURLY', 'COLON'
)


# Lexer Rules
t_GEN_ELEMENT = r'@gen:Element'
t_GEN_END = r'@gen:end'
t_LCURLY = r'\{'
t_RCURLY = r'\}'
t_COLON = r':'
t_EQUALS = r'='
t_LPAREN = r'\('
t_RPAREN = r'\)'
t_LBRACKET = r'\['
t_RBRACKET = r'\]'
t_COMMA = r','
t_TEXT = r'@child|[a-zA-Z_][a-zA-Z_0-9]*'
t_ignore = ' \t'

def t_GEN_CHILD(t):
    r'@child\([\'"].*?[\'"]\)'
    return t

def t_VARIABLE(t):
    r'@variable'
    return t

def t_STRING(t):
    r'\"([^\\\n]|(\\.))*?\"'
    t.value = t.value[1:-1]
    return t

def t_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t

def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

def t_error(t):
    print(f"Illegal character '{t.value[0]}' at line {t.lineno}")
    t.lexer.skip(1)

def generate_uuid():
    return str(uuid.uuid4())
    
lexer = lex.lex()



# Parser Rules
def p_program(p):
    '''program : program gen_element
               | gen_element'''
    if len(p) == 3:
        p[0] = p[1] + [p[2]]
    else:
        p[0] = [p[1]]

def p_gen_element(p):
    '''gen_element : GEN_ELEMENT LPAREN gen_params RPAREN COLON statements children GEN_END'''
    uuid = generate_uuid()
    p[0] = {
        "uuid": uuid,
        "name": p[3].get("name", ""),
        "type": "Element",
        "element": p[3].get("type", ""),
        "variables": p[6],
        "children": p[7]
    }

def p_gen_params(p):
    '''gen_params : gen_params COMMA gen_param
                  | gen_param'''
    if len(p) == 4:
        p[0] = {**p[1], **p[3]}
    else:
        p[0] = p[1]

def p_gen_param(p):
    'gen_param : TEXT COLON value'
    p[0] = {p[1]: p[3]}

def p_children(p):
    '''children : children child
                | child
                | '''  # Empty case
    if len(p) == 3:
        p[0] = p[1] + [p[2]]
    elif len(p) == 2:
        p[0] = [p[1]]
    else:
        p[0] = []

def p_child(p):
    'child : GEN_CHILD'
    # Extract the name from the token value
    extracted_name = p[1][8:-2]  # Assuming the format @child("name")
    p[0] = {"child_name": extracted_name}

def p_item(p):
    '''item : object
            | list
            | NUMBER
            | STRING'''
    p[0] = p[1]

def p_object(p):
    'object : LCURLY keyvalues RCURLY'
    p[0] = {k: v for k, v in p[2]}

def p_list(p):
    'list : LBRACKET items RBRACKET'
    p[0] = p[2]

def p_items(p):
    '''items : items COMMA item
             | item
             | '''
    if len(p) == 4:
        p[0] = p[1] + [p[3]]
    elif len(p) == 2:
        p[0] = [p[1]]
    else:
        p[0] = []

def p_keyvalues(p):
    '''keyvalues : keyvalues COMMA keyvalue
                 | keyvalue
                 | '''
    if len(p) == 4:
        p[0] = p[1] + [p[3]]
    elif len(p) == 2:
        p[0] = [p[1]]
    else:
        p[0] = []

def p_keyvalue(p):
    'keyvalue : TEXT COLON value'
    p[0] = (p[1], p[3])

def p_value(p):
    '''value : STRING
             | object
             | NUMBER'''
    p[0] = p[1]

def p_error(p):
    if p:
        print(f"Syntax error at token {p.type}, value '{p.value}' at line {p.lineno}")
    else:
        print("Syntax error at EOF")

parser = yacc.yacc(start='program')

# File Handling
try:
    with open('home.uni', 'r') as file:
        result = parser.parse(file.read())
        print(result)
except IOError as e:
    print(f"Error reading file: {e}")