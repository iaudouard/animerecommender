import cosine_similarity
import time
from functools import wraps


def main():
    pass


def time_it(function):
    @wraps(function)
    def time_it_wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = function(*args, **kwargs)
        end_time = time.perf_counter()
        total_time = end_time - start_time
        print(f'Function {function.__name__}{args} {kwargs} Took {total_time:.4f} seconds')
        return result

    return time_it_wrapper


@time_it
def speed_test(anime: str, method) -> str:
    method(anime)
    return "done"
