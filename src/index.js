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

    find(value, current = this.root) {
        // let current = this.root
        // while (current != null) {
        //     if (value < current.data) {
        //         current = current.left
        //     } else if (value > current.data) {
        //         current = current.right
        //     } else {
        //         return current
        //     }
        // }
        // return null

        if (current == null) {
            return null
        }

        if (value < current.data) {
            return this.find(value, current.left)
        } else if (value > current.data) {
            return this.find(value, current.right)
        } else {
            return current
        }

    }
    levelOrder(callback) {
        let result = []
        let queue = [this.root]
        while (queue.length) {

            let node = queue.shift()
            result.push(node.data)

            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        return result
        
    }

    inOrder() {
        let results = []
        function traverse(node = this.root) {
            if (node == null) {
                return
            }
            traverse(node.left)
            results.push(node.data)
            traverse(node.right)
        }
        traverse(this.root)
        return results
      }

      preOrder() {
        let results = []
        function traverse(node = this.root) {
            if (node == null) {
                return
            }
            results.push(node.data)
            traverse(node.left)
            traverse(node.right)
        }
        traverse(this.root)
        return results
      }

      postOrder() {
        let results = []
        function traverse(node = this.root) {
            if (node == null) {
                return
            }
            traverse(node.left)
            traverse(node.right)
            results.push(node.data)
        }
        traverse(this.root)
        return results
      }

      height(node) {
        let height = -1

        function traverse(node, current) {

            if (current == null) {
                return -1
            }
        
            var leftHeight = traverse(node, current.left);
    
            var rightHeight = traverse(node, current.right);
    
        
            var ans = Math.max(leftHeight, rightHeight) + 1;
    
       
            if (current.data == node.data)
                height = ans;
    
            return ans;
        }
        traverse(node, this.root)
        return height
    }

    depth(node) {
        return this.height(this.root) - this.height(node)
    }

    isBalanced() {
        const leftHeight = this.height(this.root.left)
        const rightHeight = this.height(this.root.right)
        if (Math.abs(leftHeight - rightHeight) <= 1) {
            return true
        }
        return false
    }

    reBalance() {
        const arr = this.preOrder()
        this.root = this.buildTree(arr)
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

function generateArray() {
    let arr = []
    for (let i = 0; i < 20; i++) {
        arr.push(Math.floor(Math.random() * 100))
    }
    return arr
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const video = [50,30,20,40,32,34,36,70,60,65,80,75,85]
const randArray = generateArray()

const t = new Tree(randArray)

function driver() {
    prettyPrint(t.root)

    console.log(`Is Balanced? ${t.isBalanced()}`)
    console.log(`level: ${t.levelOrder()}`)
    console.log(`pre: ${t.preOrder()}`)
    console.log(`post: ${t.postOrder()}`)
    console.log(`inorder: ${t.inOrder()}`)

    // Unbalance the tree
    t.insert(101)
    t.insert(102)
    t.insert(103)

    prettyPrint(t.root)
    console.log(`Is Balanced? ${t.isBalanced()}`)
    t.reBalance()
    prettyPrint(t.root)
    console.log(`Is Balanced? ${t.isBalanced()}`)

    console.log(`level: ${t.levelOrder()}`)
    console.log(`pre: ${t.preOrder()}`)
    console.log(`post: ${t.postOrder()}`)
    console.log(`inorder: ${t.inOrder()}`)
}

driver()





