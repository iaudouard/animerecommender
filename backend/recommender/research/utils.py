import numpy as np
import threading





def get_anime_from_id(id:int, data:np.array) -> np.array:

    for i in data:
        if i[0] == id:
            return i
    return None




def compare(a, b):
    return a > b

def merge(a, b):
    
    c = []
    i = 0
    j = 0
    while(i < len(a) and j < len(b)):
        if(compare(a[i], b[j])):
            c.append(a[i])
            i+=1
        else:
            c.append(b[j])
            j+=1
    while(i < len(a)):
        c.append(a[i])
        i+=1
    while(j < len(b)):
        c.append(b[j])
        j+=1
    return c
 
# merge sort function
def merge_sort(data):
    print(data)
    if(len(data) == 1):
        return data
    else:
        middle = len(data)//2
        left = data[0:middle]
        right = data[middle:len(data)]
        left = merge_sort(left)
        right = merge_sort(right)
        return merge(left, right)

def split(a, n):
    k, m = divmod(len(a), n)
    return [a[i*k+min(i, m):(i+1)*k+min(i+1, m)] for i in range(n)]

def merge_sort_threaded(data):

    # we use 4 threads
    splited = np.array_split(data, 4)
    p1 = splited[0]
    p2 = splited[1]
    p3 = splited[2]
    p4 = splited[3]
    threading.Thread(target = merge_sort, args = (p1)).start()
    threading.Thread(target = merge_sort, args = (p2)).start()
    threading.Thread(target = merge_sort, args = (p3)).start()
    threading.Thread(target = merge_sort, args = (p4)).start()

    return np.array()

