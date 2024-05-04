import "./style.css";

class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array)
    }

    buildTree(array) {
        // sort and remove duplicates
        array.sort((a, b) => a - b);
        array = [...new Set(array)]

        // Base Case
        if (array.length == 0) {
            return null
        }
        
        const mid = Math.floor(array.length / 2)
        const node = new Node(array[mid])
        
        
        node.left = this.buildTree(array.slice(0,mid))
        node.right = this.buildTree(array.slice(mid + 1))

        return node
    }

    insert(value) {
        const newNode = new Node(value)
        let current = this.root
        let parent = null
        while (current != null) {
            console.log(current)
            if (value < current.data) {
                if (current.left == null) {
                    current.left = newNode
                    return
                }
                current = current.left
            } else if (value > current.data) {
                if (current.right == null) {
                    current.right = newNode
                    return
                }
                current = current.right
            } else {
                return
            }
        }
    }

    delete(value, current = this.root) {
        // let current = this.root
        // let parrent = null
        // while (value != current.data) {
        //     if (value < current.data) {
        //         parent = current
        //         current = current.left
        //     } else if (value > current.data) {
        //         parent = current
        //         current = current.right
        //     }
        // }
        // if (parent.right == null) {
        //     parent.left = null
        // } else if (parent.left == null) {
        //     parent.right = null
        // }
        console.log(current)
        if (current == null) {
            return current
        }
        if (value < current.data) {
            current.left = this.delete(value, current.left)
        } else if (value > current.data) {
            current.right = this.delete(value, current.right)
        } else {
            if (current.right == null && current.left == null) {
                return null
            } else if (current.left == null) {
                return current.right
            } else if (current.right == null) {
                return current.left
            } else {
                current.data = this.minValue(current.right)

                current.right = this.delete(current.data, current.right)
                
            }
        }
        return current
    }

    minValue(node) {
        let minValue = node.data
        while (node.left != null) {
            node = node.left
            minValue = node.data
        }
        return minValue
    }

    
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const video = [50,30,20,40,32,34,36,70,60,65,80,75,85]

const t = new Tree(arr)
t.delete(4)
prettyPrint(t.root)




