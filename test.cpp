#include <bits/stdc++.h>
using namespace std;

long long solve(long long n) {
    if (n <= 3) return 1;
    return 2 * solve(n / 4);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        cout << solve(n) << "\n";
    }
    return 0;
}
