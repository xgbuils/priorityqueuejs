/**
 * Expose `BinaryHeap`.
 */
module.exports = BinaryHeap

/**
 * Initializes a new empty `BinaryHeap` with the given `comparator(a, b)`
 * function, uses `.DEFAULT_COMPARATOR()` when no function is provided.
 *
 * The comparator function must return a positive number when `a > b`, 0 when
 * `a == b` and a negative number when `a < b`.
 *
 * @param {(Array|Function)} [array=[]] - array of elements to insert in heap
 * or comparator function.
 * @param {Function} [comparator=BinaryHeap.DEFAULT_COMPARATOR] - function that
 * compares elements to sort binary heap.
 * @returns {BinaryHeap} create instance of binary heap class.
 * @api public
 */
function BinaryHeap(array, comparator) {
  if (!array || !Array.isArray(array)) {
      comparator = array
      array = []
  }
  this._comparator = typeof comparator === 'function'
      ? comparator : BinaryHeap.DEFAULT_COMPARATOR
  this.heapify(array)
}

/**
 * Compares `a` and `b`, when `a > b` it returns a positive number, when
 * it returns 0 and when `a < b` it returns a negative number.
 *
 * @param {String|Number} a - first parameter to compare
 * @param {String|Number} b - second parameter to compare
 * @returns {Number} indicates result of comparison
 * @api public
 */
BinaryHeap.DEFAULT_COMPARATOR = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  } else {
    a = a.toString()
    b = b.toString()

    if (a == b) return 0

    return (a > b) ? 1 : -1
  }
}

/**
 * Returns whether the binary heap is empty or not.
 *
 * @returns {Boolean} indicates if binary heap is empty or not
 * @api public
 */
BinaryHeap.prototype.isEmpty = function() {
  return this.size() === 0
}

/**
 * Peeks at the top element of the binary heap.
 *
 * @throws {Error} when the heap is empty.
 * @returns {*} element of binary heap
 * @api public
 */
BinaryHeap.prototype.top = function() {
  if (this.isEmpty()) throw new Error('BinaryHeap is empty')

  return this._elements[0]
}

/**
 * Gets the top element of the binary heap.
 *
 * @returns {*} element of binary heap
 * @throws {Error} when the queue is empty.
 * @api public
 */
BinaryHeap.prototype.pop = function() {
  var first = this.top()
  var last = this._elements.pop()
  var size = this.size()

  if (size === 0) return first

  this._elements[0] = last

  sink.call(this, 0, size)

  return first
}

/**
 * Push the `element` at the binary heap and returns its new size.
 *
 * @param {*} element of binary heap
 * @returns {Number} new size of heap
 * @api public
 */
BinaryHeap.prototype.push = function(element) {
  var size = this._elements.push(element)
  var current = size - 1

  while (current > 0) {
    var parent = Math.floor((current - 1) / 2)

    if (this._compare(current, parent) <= 0) break

    this._swap(parent, current)
    current = parent
  }

  return size
}

/**
 * Returns the size of the binary heap.
 *
 * @returns {Number} size of heap
 * @api public
 */
BinaryHeap.prototype.size = function() {
  return this._elements.length
}

/**
 *  Creates binary heap elements based on array
 *
 * @param {Array} arr - list of elements to set in binary heap
 * @returns {undefined} - void
 */
BinaryHeap.prototype.heapify = function(arr) {
  var size = arr.length
  this._elements = [].concat(arr)

  for (var i = size / 2 - 1; i >= 0; --i) {
    sink.call(this, i, size)
  }
}

/**
 * Compares the values at position `a` and `b` in the binary heap using its
 * comparator function.
 *
 * @param {Number} a - position of first value
 * @param {Number} b - position of second value
 * @returns {Number} - number such that sign indicates the status of comparison
 * @api private
 */
BinaryHeap.prototype._compare = function(a, b) {
  return this._comparator(this._elements[a], this._elements[b])
}

/**
 * Swaps the values at position `a` and `b` in the binary heap.
 *
 * @param {Number} a - position of first value
 * @param {Number} b - position of second value
 * @returns {undefined}
 * @api private
 */
BinaryHeap.prototype._swap = function(a, b) {
  var aux = this._elements[a]
  this._elements[a] = this._elements[b]
  this._elements[b] = aux
}

function sink(current, size) {
  while (current < size) {
    var largest = current
    var left = (2 * current) + 1
    var right = (2 * current) + 2

    if (left < size && this._compare(left, largest) >= 0) {
      largest = left
    }

    if (right < size && this._compare(right, largest) >= 0) {
      largest = right
    }

    if (largest === current) break

    this._swap(largest, current)
    current = largest
  }
}
