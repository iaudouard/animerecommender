import numpy as np
import threading
import time
from functools import wraps



def time_it(function):
    @wraps(function)
    def time_it_wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = function(*args, **kwargs)
        end_time = time.perf_counter()
        total_time = end_time - start_time
        print(f'Function {function.__name__} Took {total_time:.4f} seconds')
        return result

    return time_it_wrapper



def get_anime_from_id(id:int, data:np.array) -> np.array:

    for i in data:
        if i[0] == id:
            return i
    return None


