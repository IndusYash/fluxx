import os
import re

def resolve_conflicts_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to match the git merge conflict block
    # We want to keep the HEAD part and discard the other part.
    # Pattern:
    # <<<<<<< HEAD\n(part to keep)\n=======\n(part to discard)\n>>>>>>> branch_name\n
    pattern = re.compile(r'<<<<<<< HEAD\n(.*?)\n=======\n.*?\n>>>>>>> [^\n]+\n', re.DOTALL)
    
    new_content, count = pattern.subn(r'\1\n', content)
    
    if count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Resolved {count} conflicts in {filepath}")

def main():
    src_dir = r"C:\Users\rishi\Downloads\fluxx-main\fluxx-main\frontend\src"
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.css', '.js', '.jsx')):
                filepath = os.path.join(root, file)
                resolve_conflicts_in_file(filepath)

if __name__ == "__main__":
    main()
